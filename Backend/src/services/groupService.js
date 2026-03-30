import { prisma } from '../config/db.js'

export const getAllGroups = async (userId) => {
  return await prisma.group.findMany({
    where: {
          memberships: {
            some: {
              member:{
                userId: userId
              }
            }
          }
        },
        include: {
          memberships: {
            include: { member: true }
          },
          expenses: true,
          _count: { select: { memberships: true, expenses: true } }
        },
        orderBy: { createdAt: 'desc' }
      })
}

export const getGroupById = async (id) => {
  const group = await prisma.group.findUnique({
    where: { id : id },
    include: {
      memberships: {
        include: { member: true }
      },
      expenses: {
        include: {
          paidBy: true,
          splits: { include: { member: true } }
        },
        orderBy: { date: 'desc' }
      }
    }
  })
  if (!group) throw new Error('Group not found')
  return group
}



export const createGroup = async ({ name, description, currency, members }, userId) => {
  if (!name || !name.trim()) throw new Error('Group name is required')

  return await prisma.$transaction(async (tx) => {
    
    // creator of the group
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const creatorMember = await tx.member.upsert({
      where: { email: user.email },
      update: { userId: user.id }, 
      create: { 
        name: user.name, 
        email: user.email, 
        userId: user.id 
      }
    });

    // Create the Group
    const newGroup = await tx.group.create({
      data: {
        name: name.trim(),
        description: description || '',
        currency: currency || 'INR',
      }
    });

    // Add the Creator 
    await tx.groupMember.create({
      data: { 
        groupId: newGroup.id, 
        memberId: creatorMember.id 
      }
    });

    // other members
    if (members && members.length > 0) {
      for (const m of members) {
        const memberEmail = m.email?.trim();
        const memberName = m.name?.trim();

        if (!memberEmail || !memberName) continue;

        const member = await tx.member.upsert({
          where: { email: memberEmail },
          update: { name: memberName },
          create: { 
            name: memberName, 
            email: memberEmail 
          }
        });

        // Link the member to the new group
        await tx.groupMember.create({
          data: { 
            groupId: newGroup.id, 
            memberId: member.id 
          }
        });
      }
    }


    return tx.group.findUnique({
      where: { id: newGroup.id },
      include: {
        memberships: { 
          include: { member: true } 
        }
      }
    });
  });
};

export const deleteGroup = async (id) => {
  const group = await prisma.group.findUnique(
    { where: { id : id } })
  if (!group) throw new Error('Group not found')
  await prisma.group.delete({ where: { id : id } })
}