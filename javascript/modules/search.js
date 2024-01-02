const searchResultContainer = document.querySelector('#searchResult');

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
          const searchResult = await searchResponse.json();
          console.log(searchResult.results);

          showSearchResult(searchResult.results);

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

function showSearchResult(searchResult){
  for(const item of searchResult){
    if(item.media_type == 'movie'){
      const movieWrapper = document.createElement('div');
      searchResultContainer.append(movieWrapper);
      movieWrapper.classList.add('single_movie_search_result');

      const heading = document.createElement('h3');
      movieWrapper.append(heading);
      const movieTitle = item.title;
      heading.innerText = movieTitle;

      const image = document.createElement('img');
      movieWrapper.append(image);
      const movieImage = item.poster_path;
      image.src = `https://image.tmdb.org/t/p/w200/${movieImage}`;

      const releaseDate = document.createElement('p');
      movieWrapper.append(releaseDate);
      const movieReleaseDate = item.release_date;
      releaseDate.innerText = `Release date: ${movieReleaseDate}`;

      const description = document.createElement('p');
      movieWrapper.append(description);
      const movieDescription = item.overview;
      description.innerText = movieDescription;

    }else if(item.media_type == 'person'){
      const movieWrapper = document.createElement('div');
      searchResultContainer.append(movieWrapper);
      movieWrapper.classList.add('single_movie_search_result');

      const name = document.createElement('h3');
      movieWrapper.append(name);
      const actorName = item.name;
      name.innerText = actorName;

      const profile = document.createElement('img');
      movieWrapper.append(profile);
      const actorProfileImage = item.profile_path;
      profile.src =`https://image.tmdb.org/t/p/w200/${actorProfileImage}`;

      const knownFor = document.createElement('p');
      movieWrapper.append(knownFor);
      const knownForDepartment = item.known_for_department;
      knownFor.innerText = knownForDepartment;

      for(const movie of item.known_for){

        const heading = document.createElement('h3');
        document.body.append(heading);
        const movieTitle = movie.title;
        heading.innerText = movieTitle;

        const image = document.createElement('img');
        document.body.append(image);
        const movieImage = movie.poster_path;
        image.src = `https://image.tmdb.org/t/p/w300/${movieImage}`;
      }

    }
  }
}