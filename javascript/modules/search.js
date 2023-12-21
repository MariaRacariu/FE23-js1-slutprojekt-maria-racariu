export async function search() {
  const searchInput = document.querySelector('#searchInput').value;
  // console.log(searchInput);
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM2MzlmZGM0Mzk3ZjI2ZGE4NDE4NzFiMzJhZTQ4YyIsInN1YiI6IjY1ODA0YmE3M2E0OGM1MmI1NWFmNjcwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1AXhb6eE2vNLZkgQ5oYtNUSvny3AwfvfdZTS8deVi44'
    }
  };

  const searchURL = `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${searchInput}`;

  try {
      const searchResponse = await fetch(searchURL, options);
  
      if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          console.log(searchData);
          // showMovies(popularMoviesData.results);
      } else if (searchResponse.status === 404) {
          throw 404;
      } else {
          throw 'error';
      }
  }
  catch (error) {
    console.log(error);
  }
}