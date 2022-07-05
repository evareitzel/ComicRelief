jokes = document.querySelector('#jokes');

// Fetch info

// GET jokes 
fetch('http://localhost:3000/jokes/')
  .then(response => response.json())
  // .then(data => console.log(data));
  .then(function (data) {
    data.forEach((joke) => {
      renderJoke(joke);
      // console.log(joke);
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
    .then(response => {
      event.target.nextElementSibling.innerText = `${more} likes`
    })
    console.log(joke.likes);
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
  jokes.append(card);
}

// function renderSearch() {
//   const textField = document.createElement('form');
//   textField.idName = "search";
//   console.log(textField); 

//   document.append(textField);
// }

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