import api from './api.js'
import data from './data.js'

const app = new Vue({
	el: '#app',
	data,
	created(){
		api.getExpenses()
		.then(expenses=> {
			this.expenses = expenses
			this.loading=false
		})
		.catch(e=> console.log(e))
	},
	watch:{
		description(){
			this.valid.description=true
		},
		amount(){
			this.valid.amount=true
		},
	},
	computed:{ // only happens when the dependents of the functions change
		total(){
			/*
			let total=0
			for (const expense of this.expenses){
				total+=expense.amount
			}
			console.log(total)
			return total*/
			return this.expenses.reduce((total,expense)=>total+expense.amount,0)
		},
		saveButtonText(){
			return this.expenseId===null ? 'Add Expense' : 'Edit Expense'
		},
		clearButtonVisible(){
			if (this.description !==""||this.amount!==""||this.expenseId!==null)
				return true
			else
				return false
		},
		dark(){
			return this.theme==='dark'
		}
	},
	methods: {
		setTheme(color){
			this.theme=color
		},
		duplicateExpense(id){
			const indexOfExpense = this.expenses.findIndex(expense=>expense._id ===id)
			const expense = this.expenses[indexOfExpense]
			api.addExpense({...expense})
				.then(expense=>this.expenses.unshift(expense))
				.catch (e=> console.log(e))
		},
		validAmount(){
			return this.amount !== '' && /^[^,]([0-9]{0,3})(,?([0-9]){3})*(\.[0-9]{0,2})?$/.test(this.amount)
		},
		validDescription(){
			return this.description!==''
		},
		isValid(){
			this.valid = {
				description: this.validDescription(),
				amount: this.validAmount()	
			}
			for(const key in this.valid){
				if (this.valid[key]==false){
					const refString = `${key}Ref`
					const ref = this.$refs[refString]
					
						ref.select()
				
					
					return false
				}
			}
			return true
		
		},
		clicked(){
			this.description = this.description.trim()
			//this.amount = this.amount.trim()
			//js goes here.  the functionality. what we want to happen
			if (this.isValid()){
				if (this.expenseId!==null){
					this.updateExpense(this.expenseId)
					console.log("updated")
				}else{
					this.addExpense()
					console.log("Added")
				}
				
			}		
		},
		addExpense(){
			const expense = {
				description: this.description,
				amount: Number(this.amount.replace(/,/g,"")),
				
			}
			api.addExpense(expense)
				.then(expense => this.expenses.unshift (expense))
				.catch(e=>console.log(e))

			//this.$refs.descriptionRef.focus() //this gives us the actual inputs essentially queryselector of an id
			this.clear()
		},

		updateExpense(id){
			//this.expenses[indexOfExpense].description =this.description
			//this.expenses[indexOfExpense].amount = this.amount
			const updatedExpense  = {
				_id: id,
				description:this.description,
				amount:Number(this.amount),
				
			}

			api.updateExpense(updatedExpense)
				.then(expense => {
					const indexOfExpense = this.expenses.findIndex(expense=>expense._id===id)
					this.expenses.splice(indexOfExpense,1,expense)
					this.expenseId=null
			})
			this.clear()		
		},

		clear(){
			this.description = ''
			this.amount = ''
			this.expenseId = null
		},
		deleteExpense(id){

			api.deleteExpense(id).then(()=>{
				
				this.expenses = this.expenses.filter(expense=>expense._id!==id)

			})
			
			/*
			for (let i=0;i< this.expenses.length; i++){
				if (this.expenses[i].id===id){
					this.expense.splice(i,1)
				}
			}
			*/
		},
		editExpense(id){
			this.expenseId=id
			const indexOfExpense = this.expenses.findIndex(expense=>expense._id===id)
			this.description = this.expenses[indexOfExpense].description
			this.amount = this.expenses[indexOfExpense].amount

			this.$refs.descriptionRef.$refs.input.select()
		},

	}

})

setTimeout(() =>{
	app.message = 'Record an Expense'
}, 3000)