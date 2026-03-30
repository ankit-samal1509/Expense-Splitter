import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'

const JWT_SECRET  = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1d'

const generateToken = (userId) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES })

export const register = async ({ name, email, password }) => {
  if (!name || !email || !password) throw new Error('All fields are required')
   
  // check if user exists  
  const existing = await prisma.user.findUnique({ where: { email : email } })
  if (existing) throw new Error('Email already in use')
   
  // Hash password
  const hashed = await bcrypt.hash(password, 10)

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { name, email, password: hashed }
    })

    const member = await tx.member.upsert({
      where: { email: user.email }, // This requires @unique in schema
      update: { userId: user.id },
      create: { 
        name: user.name, 
        email: user.email, 
        userId: user.id 
      }
    });

  return {
    token: generateToken(user.id),
    user: {
      id: user.id,
      name: user.name,
      memberId: member.id,
      email: user.email
    }
  }
});
}

export const login = async ({ email, password }) => {
  if (!email || !password) throw new Error('Email and password are required')
   
  // Find user  
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid email or password')
   
  // Validate password
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Invalid email or password')

  // 3. Sync the Member Profile
  const member = await prisma.member.upsert({
    where: { email: user.email },
    update: { userId: user.id },
    create: { 
      name: user.name, 
      email: user.email, 
      userId: user.id 
    }
  });    

  return {
    token: generateToken(user.id),
    user: {
      id: user.id,
      name: user.name,
      memberId: member.id,
      email: user.email 
  }
}
}

export const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where:  { id: userId },
    select: { id: true, name: true, email: true, createdAt: true }
  })
  if (!user) throw new Error('User not found')
  return user
}
