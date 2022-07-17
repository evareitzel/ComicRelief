const jokesContainer = document.querySelector('#jokes-container');

const formContainer = document.querySelector('#form-container');

// const addJokeForm = document.querySelector('#add-joke-form');
// const addJokeCategory = document.querySelector('#add-joke-category').value;
// const addJokeSetup = document.querySelector('#add-joke-setup').value;
// const addJokeDelivery = document.querySelector('#add-joke-delivery').value;

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


function renderForm() {

  const form = document.createElement('form');
  form.setAttribute('id', 'add-joke-form');

  const formHeading = document.createElement('h3');
  formHeading.innerText = 'Add Joke';

  const categoryInput = document.createElement('div');
  categoryInput.setAttribute('id', 'add-joke-category');
  console.log(categoryInput);

  const categoryLabel = document.createElement('label');
  categoryLabel.innerText = 'Category';

  const space = document.createElement('br');

  // pun
  const category1 = document.createElement('input');
  category1.type = 'checkbox';
  category1.setAttribute('id', 'category1')
  category1.name = 'category1';
  category1.value = 'Pun';

  const category1Label = document.createElement('label');
  category1Label.innerText = 'Pun';

  // dark
  const category2 = document.createElement('input');
  category2.type = 'checkbox';
  category2.setAttribute('id', 'category2');
  category2.name = 'category2';
  category2.value = 'Dark';

  const category2Label = document.createElement('label');
  category2Label.innerText = 'Dark';

  // misc
  const category3 = document.createElement('input');
  category3.type = 'checkbox';
  category3.setAttribute('id', 'category3');
  category3.name = 'category3';
  category3.value = 'Misc';

  const category3Label = document.createElement('label');
  category3Label.innerText = 'Misc';

  // programming
  const category4 = document.createElement('input');
  category4.type = 'checkbox';
  category4.setAttribute('id', 'category4');
  category4.name = 'category4';
  category4.value = 'Programming';
  
  const category4Label = document.createElement('label');
  category4Label.innerText = 'Programming';


  const setupLabel = document.createElement('label');
  setupLabel.innerText = 'Setup ';
  // setupLabel.for = 'setup';

  const setupInput = document.createElement('input');
  setupInput.className = 'input';
  setupInput.type = 'text';
  setupInput.name = 'setup';
  // setupInput.setAttribute('id', 'add-joke-setup');

  const deliveryLabel = document.createElement('label');
  deliveryLabel.innerText = 'Delivery ';
  // deliveryLabel.for = 'delivery';

  const deliveryInput = document.createElement('input');
  deliveryInput.className = 'input';
  deliveryInput.type = 'text';
  deliveryInput.name = 'delivery';
  // deliveryInput.setAttribute('id', 'add-joke-delivery');

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'submit';
  submitBtn.className = 'button';

  const hr = document.createElement('hr');

  categoryInput.append(categoryLabel, space, category1, category1Label, category2, category2Label, category3, category3Label, category4, category4Label, space, space, space);

  form.append(formHeading, categoryInput, setupLabel, setupInput, deliveryLabel, deliveryInput, submitBtn, hr);

  formContainer.append(form);
}

// addJokeForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   addJokeFormHandler(e.target.addJokeForm.value)
// });

// function addJokeFormHandler(e) {
//   fetch(`http://localhost:3000/jokes/`, {
//     method: 'POST',
//     headers: {
//       "Content-type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       "category": addJokeCategory,
//       "setup": addJokeSetup,
//       "delivery": addJokeDelivery,
//       "likes": 0
//     })
//   })
//     .then(response => response.json())
//     .then(renderJoke(data));
// }

document.addEventListener("DOMContentLoaded", () => {
  getJokes();
  renderForm();
})