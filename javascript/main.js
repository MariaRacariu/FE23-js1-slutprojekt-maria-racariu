import {fetchMovies} from "./modules/movies.js";
import {search} from "./modules/search.js";

fetchMovies();

const searchButton = document.querySelector('#searchButton').addEventListener('click', search);