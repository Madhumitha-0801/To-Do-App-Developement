document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const prioritySelect = document.getElementById('priority-select');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.priority} ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button class="toggle-status" onclick="toggleTaskStatus(${index})">
                        <i class="${task.completed ? 'fa-solid fa-circle-check' : 'far fa-circle'}"></i>
                    </button>
                    <button class="edit" onclick="editTask(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete" onclick="deleteTask(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    // Function to add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;
        if (taskText !== '') {
            tasks.push({ text: taskText, priority: taskPriority, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    };

    // Function to edit a task
    window.editTask = (index) => {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText.trim();
            saveTasks();
            renderTasks();
        }
    };

    // Function to delete a task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Function to toggle task status
    window.toggleTaskStatus = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Initial render
    renderTasks();
});
