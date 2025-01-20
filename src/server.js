const express = require('express');
const cors = require('cors');
const Todo = require('./models/todoModel'); // Correctly import the Todo model

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Fetch all tasks
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Error fetching tasks');
    }
});

// Add a new task
app.post('/api/todos', async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const newTodo = await Todo.create({ title, description, status });
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).send('Error adding task');
    }
});

// Update a task
app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).send('Task not found');
        }
        todo.title = title;
        todo.description = description;
        todo.status = status;
        await todo.save();
        res.json(todo);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Error updating task');
    }
});

// Delete a task
app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).send('Task not found');
        }
        await todo.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Error deleting task');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});