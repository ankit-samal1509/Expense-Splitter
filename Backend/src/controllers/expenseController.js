import * as service from '../services/expenseService.js'

export const addExpense = async (req, res, next) => {
  try {
    const expense = await service.addExpense(req.body)
    res.status(201).json(expense)
  } catch (err) { next(err) }
}

export const deleteExpense = async (req, res, next) => {
  try {
    await service.deleteExpense(req.params.id)
    res.json({ message: 'Expense deleted successfully' })
  } catch (err) { next(err) }
}