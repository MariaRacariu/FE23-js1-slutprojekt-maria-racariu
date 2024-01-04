const searchResultContainer = document.querySelector('#searchResult');
const searchResultError = document.querySelector('#searchErrorMessage');

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
          if(searchResult.results.length == 0){
            const errorMessage = document.createElement('h6');
            errorMessage.innerText = 'There are no results with this name';
            searchResultError.append(errorMessage);
          }else{
            searchResultError.remove();
            showSearchResult(searchResult.results);
          }
      } else if (searchResponse.status === 404) {
          throw 404;
      } else {
          throw 'error';
      }
  }
  catch (error) {
    displayErrorMessage(error);
  }
}

function showSearchResult(searchResult){
  searchResultContainer.classList.remove('search_result_not_active');
  searchResultContainer.classList.add('search_result_active');
  for(const item of searchResult){
    if(item.media_type == 'movie'){
      const movieWrapper = document.createElement('div');
      searchResultContainer.append(movieWrapper);
      movieWrapper.classList.add('single_movie');

      const image = document.createElement('img');
      movieWrapper.append(image);
      const movieImage = item.poster_path;
      image.src = `https://image.tmdb.org/t/p/w200/${movieImage}`;

      const informationWrapper = document.createElement('div');
      movieWrapper.append(informationWrapper);
      informationWrapper.classList.add('movie_info');

      const heading = document.createElement('h3');
      informationWrapper.append(heading);
      const movieTitle = item.title;
      heading.innerText = movieTitle;

      const releaseDate = document.createElement('p');
      informationWrapper.append(releaseDate);
      const movieReleaseDate = item.release_date;
      releaseDate.innerText = `Release date: ${movieReleaseDate}`;

      const description = document.createElement('p');
      informationWrapper.append(description);
      const movieDescription = item.overview;
      description.innerText = movieDescription;

    }else if(item.media_type == 'person'){
      const movieWrapper = document.createElement('div');
      searchResultContainer.append(movieWrapper);
      movieWrapper.classList.add('single_movie');

      const profile = document.createElement('img');
      movieWrapper.append(profile);
      const actorProfileImage = item.profile_path;
      profile.src =`https://image.tmdb.org/t/p/w200/${actorProfileImage}`;
      
      const informationWrapper = document.createElement('div');
      movieWrapper.append(informationWrapper);
      informationWrapper.classList.add('movie_info');

      const name = document.createElement('h3');
      informationWrapper.append(name);
      const actorName = item.name;
      name.innerText = actorName;

      const knownFor = document.createElement('p');
      informationWrapper.append(knownFor);
      const knownForDepartment = item.known_for_department;
      knownFor.innerText = `Position: ${knownForDepartment}`;

      const knownForInfo = document.createElement('div');
      informationWrapper.append(knownForInfo);
      knownForInfo.classList.add('known_for_movies');

      for(const movie of item.known_for){
        const knownForInfoMovies = document.createElement('div');
        knownForInfo.append(knownForInfoMovies);

        const heading = document.createElement('h3');
        knownForInfoMovies.append(heading);
        const movieTitle = movie.title;
        heading.innerText = movieTitle;

        const image = document.createElement('img');
        knownForInfoMovies.append(image);
        const movieImage = movie.poster_path;
        image.src = `https://image.tmdb.org/t/p/w200/${movieImage}`;
      }
    }
  }
  const closeIcon = document.createElement('a');
  searchResultContainer.append(closeIcon);
  closeIcon.classList.add('close');
  closeIcon.addEventListener('click', clearSearch);

  function clearSearch(){
    while(searchResultContainer.firstChild){
      searchResultContainer.removeChild(searchResultContainer.firstChild);
    }
    searchResultContainer.classList.remove('search_result_active');
    searchResultContainer.classList.add('search_result_not_active');
    searchInput.value = '';

    searchResult.splice(0,searchResult.length);
    return searchResult;
  }
}

// Display Error Message for user
function displayErrorMessage(error) {
  console.log(error);

  const errorMessage = document.createElement('h1');

  if (error === 404) {
      errorMessage.innerText = '404';
  } else {
      errorMessage.innerText = 'something went wrong';
  }
  document.body.append(errorMessage);
}