const express = require('express');
const PORT = 8080;

const todos = ['wash the dishes', 'make dinner'];

const app = express();

app.get('/todos', (req, res) => {
    res.status(200).json({
    	success: true, 
    	message: todos
    });
});

app.post('/todos/:todo', (req, res) => {
	const todo = req.params.todo;
	todos.push(todo);
	res.status(201).json({
		success: true, 
		todo: todo
	});
});

app.put('/todos/:index/:newTodo', (req, res) => {
	const newTodo = req.params.newTodo;
	const index = req.params.index;
	todos[index] = newTodo;
	res.status(200).json({
		success: true, 
		todo: newTodo
	});
});

app.delete('/todos/:index', (req, res) => {
	const index = req.params.index;
	if (index >= todos.length){
		res.status(404).json({
			success: false, 
			message: 'No todo found at that index'
		})
	} else {
		const removed = todos.splice(index, 1);
		res.status(202).json({
			success: true, 
			todo: removed
		});
	}
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});