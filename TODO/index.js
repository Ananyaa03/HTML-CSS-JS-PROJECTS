const todoInput= document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addTaskButton = document.getElementById("add-task-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => renderTasks(task));

addTaskButton.addEventListener("click", () => {  
    const taskText = todoInput.value.trim();
    if(taskText === "") return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false

    }
    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    todoInput.value = "";
    console.log(tasks);
});

function renderTasks(task){
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if(task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    li.addEventListener('click',(e) => {
        if(e.target.tagName === "BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks();
    });
    li.querySelector('button').addEventListener('click',(e) => {
        e.stopPropagation(); //prevent toggle from firing
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTasks();
    });
    todoList.appendChild(li);
}

//saving values in local storage
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
