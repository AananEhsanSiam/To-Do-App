const todoForm = document.querySelector(".todoForm");
const todoInput = document.querySelector("#inputTodo");
const lists = document.querySelector(".lists");
const messageElement = document.querySelector(".message");

const showMessage = (message, bgColor) => {
  messageElement.textContent = message;
  messageElement.classList.add(
    "mb-2",
    "px-5",
    "py-3",
    "rounded-lg",
    "text-white",
    "duration-100",
    `${bgColor}`
  );
  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.classList.remove(
      "mb-2",
      "px-5",
      "py-3",
      "rounded-lg",
      "bg-green-500",
      "text-white",
      "duration-100"
    );
  }, 1500);
};

const getLocalTodos = () => {
  return localStorage.getItem("localTodos")
    ? JSON.parse(localStorage.getItem("localTodos"))
    : [];
};

const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;

  const todoID = Date.now().toString();

  createTodo(todoID, todoValue);
  showMessage("Added Successfully!", "bg-green-500");

  const todos = getLocalTodos();
  todos.push({ todoID, todoValue });
  localStorage.setItem("localTodos", JSON.stringify(todos));

  todoInput.value = "";
};

const createTodo = (todoID, todoValue) => {
  const todoElement = document.createElement("li");
  todoElement.id = todoID;
  todoElement.innerHTML = `
    <div class="flex justify-between items-center mb-2 bg-slate-600 px-5 py-3 rounded-lg text-white hover:bg-black duration-200">
        <span>${todoValue}</span>
        <span> <button class="deleteButton" type="submit"> <i class="fa fa-trash"> </i> </buttton> </span>
    </div>
    `;
  const deleteButton = todoElement.querySelector(".deleteButton");
  deleteButton.addEventListener("click", deleteTodo);

  lists.appendChild(todoElement);
};

const deleteTodo = (event) => {
  const selectedTodo =
    event.target.parentElement.parentElement.parentElement.parentElement;
  lists.removeChild(selectedTodo);
  showMessage("Todo is Deleted!", "bg-red-500");
  let todos = getLocalTodos();
  todos = todos.filter((todo) => todo.todoID !== selectedTodo.id);
  localStorage.setItem("localTodos", JSON.stringify(todos));
};

//chatGPT
/*
const deleteTodo = (event) => {
    const selectedTodo = event.target.closest("li");    
    
    if (selectedTodo) {
        lists.removeChild(selectedTodo);
    } else {
        console.error("Parent li not found for deletion");
    }
}
*/

const loadTodos = () => {
  const todos = getLocalTodos();
  todos.map((todo) => createTodo(todo.todoID, todo.todoValue));
};

todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
