const jokesContainer = document.getElementById('jokes-container');

//// Display jokes section

// Fetch info
// GET jokes 
fetch('http://localhost:3000/jokes/')
  .then(response => response.json())
  .then(function (data) {
    data.forEach((joke) => {
      renderJoke(joke);
    })
  })

// PATCH joke likes
function addLike(event, joke) {
  const more = parseInt(joke.likes++);
  fetch(`http://localhost:3000/jokes/${joke.id}`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
    .then(data => data.json())
    .then(response => { // response unused?
      event.target.nextElementSibling.innerText = `${more} likes`
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

/*
//// Search section
  const searchInput = document.getElementById('search');
  // console.log(searchInput.value);
  const submitBtn = document.getElementById('search-form');
  const resultsList = document.getElementById('search-results');

  submitBtn.addEventListener('submit', fetchResults);

  function fetchResults(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/jokes/jokes?q=${searchInput.value}`) // confirm joke.setup/delivery target obj
      .then(resp => resp.json())
      // .then(resp => console.log(resp.items));
      .then(resp => resp.items.forEach(jokeSearch))
  }

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
*/