const apiUrl = 'http://localhost:3000/api/todos';

// Fetch tasks and display them
async function getTasks() {
    try {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Display tasks with Delete and Update buttons
function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';  // Clear existing tasks
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Status: ${task.status}</p>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="editTask(${task.id}, '${task.title}', '${task.description}')">Update</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add a new task
document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;

    const newTask = {
        title,
        description,
        status: 'pending',
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });
        const addedTask = await response.json();
        getTasks();  // Refresh the task list
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

// Delete a task
async function deleteTask(taskId) {
    try {
        await fetch(`${apiUrl}/${taskId}`, { method: 'DELETE' });
        getTasks();  // Refresh the task list after deletion
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Edit a task
function editTask(taskId, currentTitle, currentDescription) {
    const newTitle = prompt('Edit task title:', currentTitle);
    const newDescription = prompt('Edit task description:', currentDescription);

    if (newTitle && newDescription) {
        const updatedTask = {
            title: newTitle,
            description: newDescription,
            status: 'pending', 
        };

        fetch(`${apiUrl}/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        })
        .then(response => response.json())
        .then(() => getTasks())  // Refresh the task list after update
        .catch(error => console.error('Error updating task:', error));
    }
}

// Initial call to load tasks
getTasks();
