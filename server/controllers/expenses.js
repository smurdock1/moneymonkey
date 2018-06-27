const moment = require('moment')
const Expense = require('../models/expenses')



module.exports = {
	listExpenses:(req, res, next)=>{
		Expense.find().then(expenses=>{
			res.json(expenses)
		}).catch(e=>console.log(e))
	},
	createExpense:(req,res, next)=>{
		console.log(req.body)
		Expense.create({
			description:req.body.description,
			amount: req.body.amount
		}).then(expense =>res.status(201).json(expense))
		.catch(e=>{
			req.error = e
			next()
			
		})
	},
	updateExpense:(req,res, next)=>{
		Expense.findByIdAndUpdate(req.params.id,{
			description:req.body.description,
			amount:req.body.amount
		},{
			new:true //make sure we return the updated one not the orginal.  this is a third parameter option to findByIdAndUpdate
		}).then(expense=>res.json(expense))
		.catch(e=>{
			req.error = e
			next()
		})
	},
	deleteExpense:(req,res, next)=>{
		Expense.findByIdAndRemove(req.params.id).then(()=>res.status(204).send())
	},
	getAnExpense:(req,res, next)=>{
		Expense.findById(req.params.id).then(expense=>res.json(expense))
	}

}