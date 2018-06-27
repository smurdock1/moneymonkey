var express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var app = express()

const expensesRouter = require('./routes/expenses.js')

global.expenses = []


app.use(bodyParser.json())
app.use(express.static(`${__dirname}/../client`))
app.use(morgan('tiny'))
app.use('/expenses', expensesRouter)

app.use((req,res,next)=>{
	if (req.error){
		switch(req.error.name){
		case 'ValidationError':
			res.status(422).json({
				message: req.error.message
			})
			break
		default:
		res.status(500).send()
		}
	}else{
		res.status(404).send()
	}
	
})

mongoose.connect('mongodb://localhost:27017/expenses')
	.then(()=>{
		app.listen(3000)
	}
).catch(e=>console.log(e))
