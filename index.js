const jokesContainer = document.getElementById('jokes-container');
let jokeArray; // make fetch data searchable

//// Display jokes section

// Fetch info
// GET jokes 
fetch('http://localhost:3000/jokes/')
  .then(response => response.json())
  .then(function (data) { 
    jokeArray = data;
    jokeArray.forEach((joke) => {
      renderJoke(joke);
    })
  })

// PATCH joke likes
function addLike(event, joke) {
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
    .then(response => { // response unused? - rename updatedJoke / updatedDB
      event.target.nextElementSibling.innerText = `${moreLikes} likes`
    })
}

function renderJoke(joke) {
  // Create card
  const card = document.createElement('div');
  card.className = 'card';

  // Create inner card elements
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
  likeBtn.addEventListener('click', event => addLike(event, joke));

  const likes = document.createElement('p');
  likes.className = 'likes';
  likes.innerText = (`${joke.likes} likes`);

  // append elements to card
  card.append(category, setup, delivery, space, likeBtn, likes);

    // append card to DOM
    jokesContainer.append(card);
}

//// Search section
// OPTION TO SEARCH BY CATEGORY
// OPTION TO DISPLAY JOKES FROM SHORTEST TO LONGEST

  const searchQuery = document.getElementById('search');
  const submitBtn = document.getElementById('search-form');
  const results = document.getElementById('search-results');

  submitBtn.addEventListener('submit', fetchResults);

  function fetchResults(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/jokes/jokes?q=${searchQuery.value}`) 
    // confirm joke.setup/delivery target obj
      .then(resp => resp.json())
      .then(resp => console.log(resp.items));
      // .then(resp => resp.items.forEach(jokeSearch))
  }

// console.log(card.joke.setup);
// console.log(jokes.joke.delivery);

function jokeSearch(joke) {
  // append card to DOM
  // jokes.append(card);
} 

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