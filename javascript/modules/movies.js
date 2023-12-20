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
        const popularMoviesHeading = document.createElement('h1');
        document.body.append(popularMoviesHeading);
        popularMoviesHeading.innerText = 'Popular Movies';
  
        const popularMoviesData = await popularResponse.json();
        showMovies(popularMoviesData.results);
  
        const topRatedMoviesHeading = document.createElement('h1');
        document.body.append(topRatedMoviesHeading);
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
      for (const movie of moviesList) {
        const heading = document.createElement('h1');
        document.body.append(heading);
        const movieTitle = movie.title;
        heading.innerText = movieTitle;
    
        const image = document.createElement('img');
        document.body.append(image);
        const movieImage = movie.poster_path;
        image.src = `https://image.tmdb.org/t/p/w200/${movieImage}`;
  
        const releaseDate = document.createElement('p');
        document.body.append(releaseDate);
        const movieReleaseDate = movie.release_date;
        releaseDate.innerText = movieReleaseDate;
        
      }
  }