//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//event Listeners

//after click to the button add news todo in todo-list
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo);

//function

function addTodo(event) {
    //prevent form submitting
    event.preventDefault();
    //create the news element in div todo(creer une list des news todo dans la div)
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li (classe en ordre le new todo entrer dans input dans <li>)
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; //recuperer la valeur entrer dans linput
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Add todo LocalStorage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerText = '<i class ="fas fa-check">validate</i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerText = '<i class ="fas fa-trash">delete</i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";

}
//target == delete

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function() {
                todo.remove();
            })
            ////todo.remove();
    }

    //check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }
}

//fonction for filter
function filterTodo(e) {
    //var todo = todo[i];
    const todos = todoList.children;
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    };
}

//Save Local 

function saveLocalTodos(todo) { //
    //check----hey do i have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //check ---hey do i already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create li (classe en ordre le new todo entrer dans input dans <li>)
        const newTodo = document.createElement("li");
        newTodo.innerText = todo; //recuperer la valeur entrer dans linput
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton = document.createElement("button");
        completedButton.innerText = "<i class ='fas fa-check'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //check trash button
        const trashButton = document.createElement("button");
        trashButton.innerText = '<i class ="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
        //clear todo input value
    });
}


function removeLocalTodos(todo) {
    //check ---hey do i already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
}