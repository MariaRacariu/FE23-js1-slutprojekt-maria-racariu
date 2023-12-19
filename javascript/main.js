async function fetchPopularMovies() {
  const optionsPopular = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM2MzlmZGM0Mzk3ZjI2ZGE4NDE4NzFiMzJhZTQ4YyIsInN1YiI6IjY1ODA0YmE3M2E0OGM1MmI1NWFmNjcwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1AXhb6eE2vNLZkgQ5oYtNUSvny3AwfvfdZTS8deVi44'
    }
  };

  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

  try {
    const response = await fetch(url, optionsPopular);
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      showPopularMovies(data);
    } else if (response.status === 404) {
      throw 404;
    } else {
      throw 'error';
    }
  }
  catch (error) {
    console.log(error);
  }
}

fetchPopularMovies();

function showPopularMovies(popularMovies) {
  console.log(popularMovies);
  for (const movie of popularMovies) {
    const heading = document.createElement('h1');
    document.body.append(heading);
    const movieTitle = movie.original_title;
    heading.innerText = movieTitle;
  }
}

















// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM2MzlmZGM0Mzk3ZjI2ZGE4NDE4NzFiMzJhZTQ4YyIsInN1YiI6IjY1ODA0YmE3M2E0OGM1MmI1NWFmNjcwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1AXhb6eE2vNLZkgQ5oYtNUSvny3AwfvfdZTS8deVi44'
//   }
// };
//
// fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

