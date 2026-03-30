import express from 'express'
import { addExpense, deleteExpense } from '../controllers/expenseController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.post('/', addExpense)
router.delete('/:id', deleteExpense)

export default router