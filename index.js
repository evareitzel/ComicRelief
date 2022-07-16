const jokesContainer = document.querySelector('#jokes-container');

const addJokeForm = document.querySelector('#add-joke-form');
const addJokeCategory = document.querySelector('#add-joke-category').value;
const addJokeSetup = document.querySelector('#add-joke-setup').value;
const addJokeDelivery = document.querySelector('#add-joke-delivery').value;

function getJokes() {
  fetch('http://localhost:3000/jokes/')
    .then(response => response.json())
    .then(function (data) {
      jokeArray = data;
      data.forEach((joke) => {
        renderJoke(joke);
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

function renderJoke(joke) {
  const card = document.createElement('div');
  card.className = 'card';

  const category = document.createElement('h3');
  category.innerText = joke.category;
  const setupDelivery = document.createElement('p');
  setupDelivery.innerText = joke.setup;
  setupDelivery.addEventListener('mouseover', (e) => displayDelivery(joke, e));

  const space = document.createElement('br');

  const likeBtn = document.createElement('button');
  likeBtn.className = 'button';
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
}

addJokeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addJokeFormHandler(e.target.addJokeForm.value)
});

function addJokeFormHandler(e) {
  fetch(`http://localhost:3000/jokes/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "category": addJokeCategory,
      "setup": addJokeSetup,
      "delivery": addJokeDelivery,
      "likes": 0
    })
  })
    .then(response => response.json())
    .then(renderJoke(data));
}

document.addEventListener("DOMContentLoaded", () => {
  getJokes();
})