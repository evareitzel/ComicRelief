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

  const setupDeliveryContainer = document.createElement('div');
  setupDeliveryContainer.className = 'setup-delivery-container';

  const setupDelivery = document.createElement('p');
  setupDelivery.innerText = joke.setup;
  setupDelivery.className = 'setup-delivery';
  setupDelivery.addEventListener('mouseover', (e) => displayDelivery(joke, e));

  const likesContainer = document.createElement('div');
  likesContainer.className = 'likes-container';

  const likeBtn = document.createElement('button');
  likeBtn.className = 'button';
  likeBtn.setAttribute('id', joke.id);
  likeBtn.innerText = 'like ♡';
  likeBtn.addEventListener('click', e => addLike(e, joke, likes));

  const likes = document.createElement('p');
  likes.className = 'likes';
  likes.innerText = (`${joke.likes} likes`);

  setupDeliveryContainer.append(setupDelivery)

  likesContainer.append(likeBtn, likes)

  card.append(category, setupDeliveryContainer, likesContainer);

  document.querySelector('#jokes-container').append(card);
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

function activateForm() {
  let form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleAddJoke(e.target.setup_input.value, e.target.delivery_input.value)
    form.reset();
  })
}

function handleAddJoke(setupStr, deliveryStr) {
  fetch(`http://localhost:3000/jokes/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "category": 'Joke',
      "setup": setupStr,
      "delivery": deliveryStr,
      "likes": 0
    })
  })
    .then(promise => promise.json())
    .then(newJoke => renderJoke(newJoke));
}

document.addEventListener('DOMContentLoaded', () => {
  getJokes();
  activateForm();
})