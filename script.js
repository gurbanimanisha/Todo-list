const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

let tasks = [];

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const task = {
            text: taskText,
            complete: false,
            editing: false
        };
        tasks.push(task);
        renderTasks();
        newTaskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <li class="task ${task.complete? 'complete' : ''} ${task.editing? 'editing' : ''}">
                <input type="text" value="${task.text}">
                <button type="button" class="complete-button">Complete</button>
                <button type="button" class="edit-button">Edit</button>
                <button type="button" class="delete-button">Delete</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
        const taskElement = taskList.children[index];
        const completeButton = taskElement.querySelector('.complete-button');
        const editButton = taskElement.querySelector('.edit-button');
        const deleteButton = taskElement.querySelector('.delete-button');
        completeButton.addEventListener('click', () => {
            task.complete =!task.complete;
            renderTasks();
        });
        editButton.addEventListener('click', () => {
            task.editing =!task.editing;
            renderTasks();
        });
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        });
        taskElement.querySelector('input[type="text"]').addEventListener('blur', () => {
            task.text = taskElement.querySelector('input[type="text"]').value;
        });
    });
}

renderTasks();