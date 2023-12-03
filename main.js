class TodoList {
    constructor() {
        this.tasks = []
        this.taskList = document.getElementById('taskList')
        this.taskInput = document.getElementById('taskInput')
    }

    addTask() {
        const taskText = this.taskInput.value.trim()
        if (taskText === '') {
            this.showToast('Пожалуйста добавьте задачу.')
            return;
        }

        const task = new Task(taskText, this)
        this.tasks.push(task)
        this.renderTasks()

        this.taskInput.value = ''
    }

    renderTasks() {
        this.taskList.innerHTML = ''
        this.tasks.forEach(task => {
            const taskElement = task.createElement()
            this.taskList.appendChild(taskElement)
        });
    }

    showToast(message) {
        alert(message)
    }

    removeTask(task) {
        const index = this.tasks.indexOf(task)
        if (index !== -1) {
            this.tasks.splice(index, 1)
            this.renderTasks()
        }
    }

    editTask(task, newText) {
        task.text = newText
        this.renderTasks()
    }

    toggleTaskCompletion(task) {
        task.completed = !task.completed
        this.renderTasks()
    }
}

class Task {
    constructor(text, todoList) {
        this.text = text
        this.completed = false
        this.todoList = todoList
    }

    createElement() {
        const taskElement = document.createElement('li')
        taskElement.className = 'goals'

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = this.completed
        checkbox.addEventListener('change', () => this.todoList.toggleTaskCompletion(this))

        const taskText = document.createElement('span')
        taskText.textContent = this.text

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.className = 'delete'
        deleteButton.addEventListener('click', () => this.todoList.removeTask(this))

        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.className = 'change'
        editButton.addEventListener('click', () => this.editTask())

        taskElement.appendChild(checkbox)
        taskElement.appendChild(taskText)
        taskElement.appendChild(editButton)
        taskElement.appendChild(deleteButton)
        return taskElement
    }

    editTask() {
        const newText = prompt('Измените задачу:', this.text)
        if (newText !== null) {
            this.todoList.editTask(this, newText)
        }
    }
}

const todoList = new TodoList()