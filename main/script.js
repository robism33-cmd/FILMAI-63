const todoList = document.getElementById("movieList"); // paliekam tavo struktūrą
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");

const api = "http://localhost:3000/todos"; // TO-DO turi būti atskira kolekcija

async function getTodos() {
  const res = await fetch(api);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function renderTodos(todos) {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.completed) li.classList.add("completed");

    // Toggle status paspaudus ant li
    li.addEventListener("click", () => {
      updateTodoStatus(todo.id, !todo.completed);
    });

    // Delete mygtukas
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation(); // kad neiškvies toggle
      deleteTodo(todo.id);
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

async function refresh() {
  try {
    const todos = await getTodos();
    renderTodos(todos);
  } catch (err) {
    console.error(err);
    todoList.innerHTML = `<li>Nepavyko užkrauti užduočių.</li>`;
  }
}

// POST
async function addTodo(value) {
  const res = await fetch(api, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ text: value, completed: false }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await refresh();
}

// DELETE
async function deleteTodo(id) {
  const res = await fetch(`${api}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await refresh();
}

// PATCH
async function updateTodoStatus(id, completed) {
  const res = await fetch(`${api}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await refresh();
}

addBtn.addEventListener("click", () => {
  const inputValue = todoInput.value.trim();
  if (!inputValue) return;

  todoInput.value = "";
  addTodo(inputValue);
});

refresh();
