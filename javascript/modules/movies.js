const moviesContainer = document.querySelector('.movies_container');

export async function fetchMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM2MzlmZGM0Mzk3ZjI2ZGE4NDE4NzFiMzJhZTQ4YyIsInN1YiI6IjY1ODA0YmE3M2E0OGM1MmI1NWFmNjcwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1AXhb6eE2vNLZkgQ5oYtNUSvny3AwfvfdZTS8deVi44'
    }
  };

  const popularMoviesURL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const topRatedMoviesURL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

  try {
    const popularResponse = await fetch(popularMoviesURL, options);
    const topRatedResponse = await fetch(topRatedMoviesURL, options);

    if (popularResponse.ok && topRatedResponse.ok) {
      const popularMoviesHeading = document.createElement('h2');
      moviesContainer.append(popularMoviesHeading);
      popularMoviesHeading.innerText = 'Popular Movies';

      const popularMoviesData = await popularResponse.json();
      showMovies(popularMoviesData.results);

      const topRatedMoviesHeading = document.createElement('h2');
      moviesContainer.append(topRatedMoviesHeading);
      topRatedMoviesHeading.innerText = 'Top Rated Movies';

      const topRatedMoviesData = await topRatedResponse.json();
      showMovies(topRatedMoviesData.results);

    } else if (popularResponse.status === 404 && topRatedResponse.status === 404) {
      throw 404;
    } else {
      throw 'error';
    }
  }
  catch (error) {
    console.log(error);
  }
}

function showMovies(moviesList) {
  var counter = 0;

  for (const movie of moviesList) {
    if (counter < 10) {
      const movieWrapper = document.createElement('div');
      moviesContainer.append(movieWrapper);
      movieWrapper.classList.add('single_movie');

      const heading = document.createElement('h3');
      movieWrapper.append(heading);
      const movieTitle = movie.title;
      heading.innerText = movieTitle;

      const image = document.createElement('img');
      movieWrapper.append(image);
      const movieImage = movie.poster_path;
      image.src = `https://image.tmdb.org/t/p/w200/${movieImage}`;

      const releaseDate = document.createElement('p');
      movieWrapper.append(releaseDate);
      const movieReleaseDate = movie.release_date;
      releaseDate.innerText = movieReleaseDate;

      counter++;
    }
  }
}