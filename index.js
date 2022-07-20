// GitHub branch form-development

const jokesContainer = document.querySelector('#jokes-container');
const formContainer = document.querySelector('#form-container');

const addJokeForm = document.createElement('form');
const formHeading = document.createElement('h3');
const categoryLabel = document.createElement('label');
const categoryInput = document.createElement('input');
const setupLabel = document.createElement('label');
const setupInput = document.createElement('input');
const deliveryLabel = document.createElement('label');
const deliveryInput = document.createElement('input');
const submitBtn = document.createElement('input');

const addJokeData = new FormData();

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

function renderJoke(joke) {
  const card = document.createElement('div');
  card.className = 'card';

  const category = document.createElement('h3');
  category.innerText = joke.category;

  const setupDelivery = document.createElement('p');
  setupDelivery.innerText = joke.setup;
  setupDelivery.className = 'setup-delivery';
  setupDelivery.addEventListener('mouseover', (e) => displayDelivery(joke, e));

  const likeBtn = document.createElement('button');
  likeBtn.className = 'button';
  likeBtn.setAttribute('id', joke.id);
  likeBtn.innerText = 'like ♡';
  likeBtn.addEventListener('click', e => addLike(e, joke, likes));

  const likes = document.createElement('p');
  likes.className = 'likes';
  likes.innerText = (`${joke.likes} likes`);

  card.append(category, setupDelivery, likeBtn, likes);

  jokesContainer.append(card);
}

function displayDelivery(joke, e) {
  e.preventDefault();
  e.target.innerText === joke.setup ? e.target.innerText = joke.delivery : e.target.innerText = joke.setup;
}

function addLike(e, joke, likes) {
  e.preventDefault();
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

function renderForm() {
  addJokeForm.setAttribute('id', 'add-joke-form');
  formHeading.innerText = 'Would you like to contribute a joke?';

  categoryLabel.innerText = 'Joke Type';
  categoryInput.className = 'input';
  categoryInput.type = 'text';

  setupLabel.innerText = 'Setup ';
  setupInput.className = 'input';
  setupInput.type = 'text';

  deliveryLabel.innerText = 'Delivery ';
  deliveryInput.className = 'input';
  deliveryInput.type = 'text';

  submitBtn.type = 'submit';
  submitBtn.value = 'Add joke';
  submitBtn.className = 'button';

  addJokeForm.append(formHeading, categoryLabel, categoryInput, setupLabel, setupInput, deliveryLabel, deliveryInput, submitBtn);

  formContainer.append(addJokeForm);
}

addJokeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addJokeFormHandler(e)
});

function addJokeFormHandler(e) {
  fetch(`http://localhost:3000/jokes/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "category": categoryInput.value,
      "setup": setupInput.value,
      "delivery": deliveryInput.value,
      "likes": 0
    })
  })
    .then(promise => promise.json())
    .then(newJoke => renderJoke(newJoke));
}

document.addEventListener('DOMContentLoaded', () => {
  getJokes();
  renderForm();
})