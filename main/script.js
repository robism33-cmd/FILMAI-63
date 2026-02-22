const api = "http://localhost:3000/movies";
const list = document.getElementById("movieList");
list.addEventListener("click", (event) => {
  const img = event.target.closest("img[data-id]");
  if (!img) return;

  const movieId = img.dataset.id;
  window.location.href = `movie.html?id=${encodeURIComponent(movieId)}`;
});

async function getMovies() {
  try {
    const response = await fetch(api);
    const movies = await response.json();
    movies.forEach((movie) => {
      list.innerHTML += `<div class="movie" href="movie.html?id=${movie.id}">
        <img src="${movie.image}" alt="filmo nuotrauka">
        <div class="movie-content">
          <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <p>Year: ${movie.year}</p>
        </div>;
        </div>`;
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
getMovies();
