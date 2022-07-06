const jokesContainer = document.getElementById('jokes-container');
let jokeArray;

fetch('http://localhost:3000/jokes/')
  .then(response => response.json())
  .then(function (data) { 
    jokeArray = data;
    jokeArray.forEach((joke) => {
      renderJoke(joke);
    })
  })

function showJokes(jokeArray) {
  for (let i = 0; i < 12; i++) {
    const obj = jokeArray.joke;
    joke = joke + i;
  }
  console.log(jokeArray);
}

function addLike(event, joke, likes) {
  const moreLikes = parseInt(joke.likes++);
  fetch(`http://localhost:3000/jokes/${joke.id}`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": moreLikes
    })
  })
    .then(data => data.json())
    .then(updatedJoke => {
      likes.innerText = `${updatedJoke.likes} likes`
    })
}

function renderJoke(joke) {
  const card = document.createElement('div');
  card.className = 'card';

  const category = document.createElement('h3');
  category.innerText = joke.category;

  const setup = document.createElement('p');
  setup.innerText = joke.setup;

  const delivery = document.createElement('p');
  delivery.innerText = joke.delivery;

  const space = document.createElement('br');

  const likeBtn = document.createElement('button');
  likeBtn.className = 'like-btn';
  likeBtn.setAttribute('id', joke.id);
  likeBtn.innerText = 'like ♡';
  likeBtn.addEventListener('click', event => addLike(event, joke, likes));

  const likes = document.createElement('p');
  likes.className = 'likes';
  likes.innerText = (`${joke.likes} likes`);

  card.append(category, setup, delivery, space, likeBtn, likes);

    jokesContainer.append(card);
}

//// Search section
// OPTION TO SEARCH BY CATEGORY
// OPTION TO DISPLAY JOKES FROM SHORTEST TO LONGEST

function keywordSearch(joke) {
  const searchQuery = document.getElementById('search');
  const submitBtn = document.getElementById('search-form');
  const results = document.getElementById('search-results');

  submitBtn.addEventListener('submit', fetchResults);
  // jokeArray
  // confirm joke.setup/delivery target obj
  console.log(jokeArray.joke.setup);
  console.log(jokeArray.joke.delivery);

  const searchResult = newJokeArray.filter(joke => joke.include(searchQuery));
  console.log(searchResult);
}
  // Pseudocode
  // const newJokeArray = jokeArray.joke.setup + jokeArray.joke.delivery
  // get searchQuery
  // make searchQuery include single, pluralized, non-capital letters
  // find string(s) in newJokeArray containing searchQuery (filter method)
  // return joke(s) containing searchQuery
  // If no matches, display 'No matches found"and display full joke list below.

  // - filter catergory = search word
  // - single, pluralized, non-capital letters
  // - array.filter method - outputs new array
  // - array.clear info - output new arr post-filter
  // - else - if empty? (default to full collection)

  // jokes.append(card);
  // append card to DOM
 


// Search jokes by "if this joke contains keyword"
// function search(joke) {}
  // if joke.setup or joke.delivery contains this keyword
  // get joke
  // append joke card to DOM

// Add a new joke
// form input
// function with fetch
// function renderNewJoke
// create inner card elements
// append elements to card
// append card to dom