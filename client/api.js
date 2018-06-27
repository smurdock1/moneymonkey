const getExpenses = ()=>
	fetch('/expenses')
		.then(res=>res.json())

const addExpense = (expense) => 
	fetch('/expenses',{
		method: 'POST',
		headers:{
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(expense)
	})
		.then(res=>res.json())


const updateExpense = (updatedExpense)=>
	fetch(`/expenses/${updatedExpense._id}`,{
		method: 'PUT',
		headers: {
			'Content-Type':'application/json'
		},
		body: JSON.stringify(updatedExpense)
	}).then(res=>res.json())


const deleteExpense = (id) => 
	fetch(`/expenses/${id}`,{
		method: 'DELETE',
		
	})

export default{
	getExpenses,
	addExpense,
	updateExpense,
	deleteExpense
}