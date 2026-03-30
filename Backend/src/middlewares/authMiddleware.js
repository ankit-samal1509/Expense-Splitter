import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const protect = (req, res, next) => {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authorized, no token' })
  }

  try {
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch {
    res.status(401).json({ error: 'Not authorized, invalid token' })
  }
}