const express = require('express')
const router = express.Router()

const expenseController = require('../controllers/expenses')

//a get to '/expenses'
router.get('/',expenseController.listExpenses)
router.post('/',expenseController.createExpense)

// a put to '/expenses/id'
router.put('/:id',expenseController.updateExpense)
router.delete('/:id',expenseController.deleteExpense)
router.get('/:id',expenseController.getAnExpense)

//export default router==
module.exports = router