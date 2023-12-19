const API_KEY = "42c639fdc4397f26da841871b32ae48c";

const url = `https://api.themoviedb.org/3/movie/100?language=en-US&api_key=${API_KEY}`;

fetch(url)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));