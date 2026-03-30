import { prisma } from '../config/db.js'

export const addExpense = async ({ groupId, description, amount, paidById, splits }) => {
  if (!groupId)     throw new Error('groupId is required')
  if (!description) throw new Error('Description is required')
  if (!amount || amount <= 0) throw new Error('Valid amount is required')
  if (!paidById)    throw new Error('paidById is required')
  if (!splits || splits.length === 0) throw new Error('Splits are required')

  const group = await prisma.group.findUnique({ where: { id: groupId } })
  if (!group) throw new Error('Group not found')

  const share = parseFloat((amount / splits.length).toFixed(2))  

  const expense = await prisma.expense.create({
    data: {
      groupId,
      description,
      amount,
      paidById,
      splits: {
        create: splits.map(memberId => ({
          memberId,  
          share      
        }))

      }
    },
    include: {
      paidBy: true,
      splits: { include: { member: true } }
    }
  })

  return expense
}

export const deleteExpense = async (id) => {
  const expense = await prisma.expense.findUnique({ where: { id } })
  if (!expense) throw new Error('Expense not found')
  await prisma.expense.delete({ where: { id } })
}