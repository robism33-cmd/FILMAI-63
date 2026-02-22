const movieList = document.getElementById("title");
const movieDescription = document.getElementById("description");
const movieYear = document.getElementById("year");
const api = "http://localhost:3000/movies";
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
async function getMovie() {
  try {
    const response = await fetch(`${api}/${movieId}`);
    const movie = await response.json();
    movieList.textContent = movie.title;
    movieDescription.textContent = movie.description;
    movieYear.textContent = `Year: ${movie.year}`;
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
}
getMovie();
