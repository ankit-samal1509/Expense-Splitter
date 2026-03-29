import 'dotenv/config'
import express from 'express'
import cors from 'cors'
// import authRoutes    from './src/routes/auth.routes.js'
// import groupRoutes   from './src/routes/group.routes.js'
// import expenseRoutes from './src/routes/expense.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

// app.use('/api/auth', authRoutes)
// app.use('/api/groups', groupRoutes)
// app.use('/api/expenses', expenseRoutes)

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT, () => console.log('🚀 Server running on port 5000'))
