const jokesContainer = document.querySelector('#jokes-container');
const formContainer = document.querySelector('#form-container');

const hr = document.createElement('hr');
const space = document.createElement('br');

const addJokeForm = document.createElement('form');
const formHeading = document.createElement('h3');
const categoryLabel = document.createElement('label');
const categoryInput = document.createElement('input');
const setupLabel = document.createElement('label');
const setupInput = document.createElement('input');
const deliveryLabel = document.createElement('label');
const deliveryInput = document.createElement('input');
const submitBtn = document.createElement('input');

function getJokes() {
  event.preventDefault();
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

  const categoryTitle = document.createElement('h3');
  categoryTitle.innerText = joke.category;

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

  card.append(categoryTitle, setupDelivery, space, likeBtn, likes);

  jokesContainer.append(card);
}

function displayDelivery(joke, e) {
  e.preventDefault();
  e.target.innerText === joke.setup ? e.target.innerText = joke.delivery : e.target.innerText = joke.setup;
}

function renderForm() {
  addJokeForm.setAttribute('id', 'add-joke-form');
  formHeading.innerText = 'Would you like to contribute a joke?';

  categoryLabel.innerText = 'Joke Type';
  categoryInput.className = 'input';
  categoryInput.type = 'text';
  // categoryInput.setAttribute('id', 'add-joke-category');
  // categoryInput.setAttribute('id', 'category');

  setupLabel.innerText = 'Setup ';
  setupInput.className = 'input';
  setupInput.type = 'text';
  // setupInput.setAttribute('id', 'add-joke-setup');

  deliveryLabel.innerText = 'Delivery ';
  deliveryInput.className = 'input';
  deliveryInput.type = 'text';
  // deliveryInput.setAttribute('id', 'add-joke-delivery');

  submitBtn.type = 'submit';
  submitBtn.value = 'Add joke';
  submitBtn.className = 'button';

  addJokeForm.append(formHeading, categoryLabel, categoryInput, setupLabel, setupInput, deliveryLabel, deliveryInput, submitBtn, hr);

  formContainer.append(addJokeForm);
}
console.log(addJokeForm);

const addJokeData = new FormData();
  // addJokeData.append('Setup', setupInput.value);
  // addJokeData.append('Delivery', deliveryInput.value);
  // console.log(addJokeData);

addJokeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addJokeFormHandler(e.target.addJokeForm)
});

function addJokeFormHandler(e, addJokeData) {
  fetch(`http://localhost:3000/jokes/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "category": categoryInput.value,
      "setup" : setupInput.value,
      "delivery": deliveryInput.value,
      "likes": 0
    })
  })
    .then(response => response.json())
    .then(renderJoke(addJokeData));
}

document.addEventListener("DOMContentLoaded", () => {
  getJokes();
  renderForm();
})