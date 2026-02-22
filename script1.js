// Senas variantas
const api = "http://localhost:3000/todos";

function getTodos() {
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach(todos);
      console.log(`${todos.Id} ${todos.text} ${todos.completed}`);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Nujas metodas try catch blokas
// async funkcija leidžia naudoti await, kuris laukia, kol bus gautas atsakymas iš fetch, ir tik tada tęsiama toliau.
async function getTodos() {
  try {
    // await sustabdo funkcijos vykdymą, kol fetch grąžins atsakymą, o tada priskiria jį kintamajam response.
    const response = await fetch(api);
    const data = await response.json();
    data.forEach((todos) => {
      console.log(`${todos.Id} ${todos.text} ${todos.completed}`);
    });
  } catch (error) {
    console.log(error);
  }
}

// Pavizdys su async await ir error handling
async function getTodo(title) {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getTodos();
getTodo("Naujas todo");
