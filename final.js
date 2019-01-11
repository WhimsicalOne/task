class Tasks {
    constructor(title, description, id, done) {
        this.title = title;
        this.description = description;
        this.id = id;
        this.done = done;
    }
}
class UI {
    addTaskToList(task) {
        const list = document.getElementById("toDoList");
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `<h6 class="task-header">${task.title}</h6>
                        <div class="task-content">
                            <i class="fas fa-bell"></i>
                            <p class="task-description">${task.description}</p>
                            <div class="options">
                                <span class="update">Update</span>
                                <span class="delete">Delete</span>
                            </div>
                        </div>
                        <span class="hidden">${task.id}</span>`
        list.appendChild(li);
    }
    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    }
    showAlert(message, cssName) {
        const alert = document.createElement("div");
        alert.className = `alert ${cssName}`;
        const container = document.getElementById("formContainer");
        const form = document.getElementById("list-form");
        alert.appendChild(document.createTextNode(message));
        container.insertBefore(alert, form);
        setTimeout(function() {
            document.querySelector(".alert").remove();
        }, 1500)
    }
    removeTask(target) {
        if(target.className === "delete") {
            target.parentElement.parentElement.parentElement.remove();
            return true;
        }
    }
    updateTask(target) {
        if(target.className === "update") {
            const ui = new UI();
            const div = document.createElement("div");
            const taskItem = target.parentElement.parentElement.parentElement;
            div.className = "editBox";
            div.innerHTML = `<input type="text" id="edit-title" placeholder="Enter your new title">
                            <input type="text" id="edit-descr" placeholder="Enter your new description">
                            <button id="submit">Submit</button>`
            const editBox = target.parentElement.parentElement.parentElement.getElementsByClassName("editBox");
            if(editBox.length < 1) {
                taskItem.append(div);
            }
            const editTitle = document.getElementById("edit-title");
            const editDescr = document.getElementById("edit-descr");
            let oldTitle = target.parentElement.parentElement.parentElement.querySelector(".task-header");
            let oldDescr = target.parentElement.parentElement.querySelector(".task-description");
            document.getElementById("submit").addEventListener("click", updateTask)
            function updateTask() {
                if(editTitle.value === "" || editDescr.value === "") {
                    ui.showAlert("Can't be empty", "error");
                } else {
                    oldTitle.innerHTML = `${editTitle.value}`;
                    oldDescr.innerHTML = `${editDescr.value}`;
                    StoreTasks.updatingTask(target.parentElement.parentElement.parentElement.querySelector(".hidden").textContent,
                    target.parentElement.parentElement.parentElement.querySelector(".task-header"), 
                    target.parentElement.parentElement.querySelector(".task-description")
                    )
                    div.remove();
                }

            }
            return true;
        }
    }
}
class StoreTasks {
    static getTasks() {
        let tasks;
        if(localStorage.getItem('tasks') === null) {
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }
    static displayTasks() {
        const tasks = StoreTasks.getTasks();
        tasks.forEach(function(task){
            const ui  = new UI;
            ui.addTaskToList(task);
        });
    }
    static addTask(task) {
        const tasks = StoreTasks.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    static deleteTask(id) {
        const tasks = StoreTasks.getTasks();
        tasks.forEach(function(task, index) {
            if(task.id === parseInt(id)) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    static updatingTask(id, heading, description) {
        const tasks = StoreTasks.getTasks();
        tasks.forEach(function(task, index) {
            if(task.id === parseInt(id)) {
                task.title = `${heading.innerHTML}`;
                task.description = `${description.innerHTML}`;
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
document.addEventListener('DOMContentLoaded', StoreTasks.displayTasks);
document.getElementById("list-form").addEventListener("submit", function(e) {
    const title = document.getElementById("title").value,
        description = document.getElementById("description").value,
        id = Math.floor(Math.random() * 1000) + 1;
    let done = false;
    const task = new Tasks(title, description, id, done);
    const ui = new UI();
    if(title === "" || description === "") {
        ui.showAlert("Please fill in all fields!!", "error")
    } else {
        ui.
        addTaskToList(task);
        StoreTasks.addTask(task);
        ui.showAlert("Task Added", "success");
        ui.clearFields();
    }
    e.preventDefault();
});
document.getElementById("toDoList").addEventListener("click", function(e) {
    const ui = new UI();
    const taskRemoved = ui.removeTask(e.target);
    if(taskRemoved) {
        ui.showAlert("Task removed!", "success");
        StoreTasks.deleteTask(e.target.parentElement.parentElement.parentElement.querySelector(".hidden").textContent);
    }
    const taskUpdated = ui.updateTask(e.target);
    if(taskUpdated) {
        ui.showAlert("Task updated!", "success");
    }
    e.preventDefault();
});