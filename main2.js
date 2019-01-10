// OOP JS
class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}
class UI {
    constructor() {
        this.addTask = function(task) {
            const li = document.createElement("li");
            const toDoList = document.getElementById("toDoList");
            li.innerHTML = `<h6 class="task-header">${task.title}</h6>
                            <div class="task-content">
                                <i class="fas fa-bell"></i>
                                <p class="task-description">${task.description}</p>
                                <div class="options">
                                    <span class="update">Update</span>
                                    <span class="delete">Delete</span>
                                </div>
                            </div>`
            toDoList.appendChild(li);
        }
        this.clearFields = function() {
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
        }
        this.showAlert = function(message, cssName) {
            const alertBox = document.createElement("div");
            const form = document.getElementById("list-form");
            const container = document.getElementById("formContainer");
            alertBox.className = `alert ${cssName}`;
            alertBox.appendChild(document.createTextNode(message));
            container.insertBefore(alertBox, form);
            setTimeout(function() {
                document.querySelector(".alert").remove();
            }, 1500)
        }
        this.removeTask = function(target) {
            if(target.className === "delete") {
                target.parentElement.parentElement.parentElement.remove();
                return true;
            }
        }
        this.updateTask = function(task, target) {
            // intend to use task to make this less weird.
            if(target.className === "update") {
                // Version 1:
                // let taskTitle = target.parentElement.parentElement.parentElement.getElementsByClassName("task-header")[0];
                // let taskDescription = target.parentElement.parentElement.getElementsByClassName("task-description")[0];
                // let newTitle = prompt(`This is your old title - ${taskTitle.innerHTML}, please choose choose a new one!`);
                // let newDescription = prompt(`This is your old description - ${taskDescription.innerHTML}, please choose choose a new one!`);
                // if (newTitle === "" && newDescription === "") {
                //     newTitle = prompt(`This is your old title - ${taskTitle.innerHTML}, please choose choose a new one!`);
                //     newDescription = prompt(`This is your old description - ${taskDescription.innerHTML}, please choose choose a new one!`);
                // } else if (newTitle && newDescription) {
                //     taskTitle.innerHTML = `${newTitle}`;
                //     taskDescription.innerHTML = `${newDescription}`;
                // } else {
                //     alert("You cancelled.");
                // }
                // Version 2:
                // First add old values into form elements that being title and description from list of items, whichever one, so use target.
                // let taskTitle = target.parentElement.parentElement.parentElement.getElementsByClassName("task-header")[0];
                // let taskDescription = target.parentElement.parentElement.getElementsByClassName("task-description")[0];
                // let newTitle = document.getElementById("title");
                // newTitle.value = `${taskTitle.innerHTML}`;
                // let newDesc = document.getElementById("description");
                // newDesc.value = `${taskDescription.innerHTML}`;
                // let btn = document.getElementById("submitTask");
                // btn.value = "Update Task";
                // // Secondly, once old values are in the form elements, save it into a variable or object, and then change button to update task.
                // // Thirdly, click on update and it updates to the new values in the list.
                // btn.addEventListener("click", function() {
                //     taskTitle.innerHTML = `${newTitle.value}`;
                //     taskDescription.innerHTML = `${newDesc.value}`;
                //     // Change name back..and reset forms.
                //     document.getElementById("title").value = "";
                //     document.getElementById("description").value = "";
                //     btn.value = "Add Task";
                // }, true);
                // Version 3:
                let taskTitle = target.parentElement.parentElement.parentElement.getElementsByClassName("task-header")[0];
                // This will always give the value of the form input..
            }
        }
    }
};
class Storage {
    static displayTask() {

    };
    static saveTasks() {

    };
    static updateTask() {

    };
    static readTasks() {

    };
};
document.getElementById("list-form").addEventListener("submit", function(e) {
    const title = document.getElementById("title").value,
    description = document.getElementById("description").value;
    const task = new Task(title, description, allTasks);
    const ui = new UI();
    // add task..
    if(task.title === "" || task.description === "") {
        ui.showAlert("Please fill all fields!", "error");
    } else {
        ui.addTask(task);
        ui.showAlert("Task added!!", "success");
        ui.clearFields();
    }
    e.preventDefault();
});
document.getElementById("toDoList").addEventListener("click", function(e) {
    const ui = new UI();
    const title = document.getElementById("title").value,
    description = document.getElementById("description").value;
    const task = new Task(title, description);
    const removedTask = ui.removeTask(e.target);
    if(removedTask) {
        ui.showAlert("Task removed!!", "success");
    }
    const taskUpdated = ui.updateTask(task, e.target);
    if(taskUpdated) {
        ui.showAlert("Task updated!", "success");
    }
    e.preventDefault();
})