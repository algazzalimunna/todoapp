
// find Element
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todoForm");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");


//showMessage
const showMessage = (text , status) =>{
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);

};

// getTodosFormLocalStorage
const getTodosFormLocalStorage = ( ) =>{
    return localStorage .getItem("mytodos") ? JSON.parse(localStorage .getItem("mytodos")) : [];
};

// deleteTodo
const deleteTodo = (event) =>{
    const selectedTodo =event.target.parentElement.parentElement.parentElement;

    todoLists.removeChild(selectedTodo);
    showMessage("todo is deleted","danger");

    // deleted todo from localStorage
    let todos = getTodosFormLocalStorage();
    todos = todos.filter((x)=>x.todoId !== selectedTodo.id );
    localStorage.setItem("mytodos",JSON.stringify(todos));

};


//create todo
const createTodo = (todoId , todoValue ) =>{
    const todoElement = document.createElement("li");
    todoElement.classList.add("listStyle");
    todoElement.id = todoId;
    todoElement.innerHTML = `
    <span>${todoValue}</span>
    <span><button class="btn" id="deleteButton"> <i class="fa fa-trash"></i>  </button></span>
    `;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click",deleteTodo);
};

// addTodo function
const addTodo = (event) =>{
    event.preventDefault();
    const todoValue =todoInput.value;

    //unique Id
    const todoId = Date.now().toString();
    createTodo(todoId , todoValue );
    showMessage("todo is added","success");

    // add todo to localStorage
    const todos = getTodosFormLocalStorage();
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));

    todoInput.value="";
};

// load todos
const loadTodos = () => {
    const todos =  getTodosFormLocalStorage();
    todos.map((x)=> createTodo(x.todoId,x.todoValue));
};

// adding listener
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
