const form = document.querySelector("form");
const input = document.querySelector("[type=text]");
const buttonAdd = document.querySelector("button");
const listTodos = document.querySelector("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    formSubmit(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSubmit();
});

function formSubmit(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  const newTodoEl = document.createElement("li");

  newTodoEl.innerHTML = `<input type="checkbox" name="checkbox">
  <label>${todoText}</label><img src="./images/trash.svg">`;

  listTodos.style.display = "flex";
  listTodos.appendChild(newTodoEl);

  input.value = "";

  const newTodos = document.querySelectorAll("li");
  const removeButton = document.querySelector("li img");

  newTodos.forEach((item, index) => {
    if (todo && todos[index].completed)
      item.children[0].setAttribute("checked", "true");

    item.children[0].setAttribute("id", index);
    item.children[1].setAttribute("for", index);
    item.children[2].addEventListener("click", () => item.remove());
    
    item.addEventListener("click", () => updateLS());
  });

  updateLS();
}

function updateLS() {

  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.children[1].innerText,
      completed: todoEl.children[0].checked,
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
