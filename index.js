const jokesContainer = document.getElementById('jokes-container');
let jokeArray;

function getJokes() {
  fetch('http://localhost:3000/jokes/')
  .then(response => response.json())
  .then(function (data) {
    jokeArray = data;

    data.forEach((joke) => {
      renderJoke(joke);
      // console.log(jokeArray);
    })
  })
}

function addLike(event, joke, likes) {
  event.preventDefault();
  const moreLikes = parseInt(joke.likes + 1);
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

const submitButton = document.getElementById('submit-new-joke');

submitButton.addEventListener('submit', (event) => {
  event.preventDefault();

  console.log(event);
  addJokeFormHandler(event)
});

function addJokeFormHandler(event, input) {
  // get data to pass into fxn (console-log)
console.log(addJokeCategory);
// get joke.category
const addJokeCategory = document.getElementById('add-joke-category');
// get joke.setup
const addJokeSetup = document.getElementById('add-joke-setup');
// get joke.delivery
const addJokeDelivery = document.getElementById('add-joke-delivery');
// const addJokeForm = document.getElementById('add-joke-form');

// fetch --> PUT (new content)
fetch(`http://localhost:3000/jokes/${joke.id}`, {
  method: 'PUT',
  headers: {
    "Content-type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    "category": addJokeCategory, 
      "type": "twopart",
      "setup": addJokeSetup,
      "delivery": addJokeDelivery,
      "id": 1, // make / get joke ID
      "likes": 0
  })
})
  .then(response => response.json())
  .then(function (data) {
    data.forEach((joke) => {
      renderJoke(joke);

// renderJoke; (newJoke - at top) -- should be automatic OR  remind renderJoke (page reload helper function))
}
    )}
  )}

function renderJoke(joke) {
  const card = document.createElement('div');
  card.className = 'card';

  const category = document.createElement('h3');
  category.innerText = joke.category;
  console.log(addJokeSetup);
  const setupDelivery = document.createElement('p');
  setupDelivery.innerText = joke.setup;
  setupDelivery.addEventListener('mouseover', (e) => displayDelivery(joke, e));

  const space = document.createElement('br');

  const likeBtn = document.createElement('button');
  likeBtn.className = 'like-btn';
  likeBtn.setAttribute('id', joke.id);
  likeBtn.innerText = 'like ♡';
  likeBtn.addEventListener('click', event => addLike(event, joke, likes));

  const likes = document.createElement('p');
  likes.className = 'likes';
  likes.innerText = (`${joke.likes} likes`);

  card.append(category, setupDelivery, space, likeBtn, likes);

  jokesContainer.append(card);
}

function displayDelivery(joke, e) {
  e.preventDefault();
  e.target.innerText === joke.setup ? e.target.innerText = joke.delivery : e.target.innerText = joke.setup;
  // console.log(joke, e);
}

document.addEventListener("DOMContentLoaded", () => {
  getJokes();
})