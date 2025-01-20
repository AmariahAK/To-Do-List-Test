const Todo = require('../models/todoModel');

// Create a new to-do
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create to-do' });
  }
};

// Get all to-dos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch to-dos' });
  }
};

// Get a single to-do by ID
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ error: 'To-do not found' });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch to-do' });
  }
};

// Update a to-do
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ error: 'To-do not found' });
    await todo.update({ title, description, status });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update to-do' });
  }
};

// Delete a to-do
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ error: 'To-do not found' });
    await todo.destroy();
    res.status(204).send(); // No content response
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete to-do' });
  }
};
