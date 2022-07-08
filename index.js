const jokesContainer = document.getElementById('jokes-container');
let jokeArray;

fetch('http://localhost:3000/jokes/')
  .then(response => response.json())
  .then(function (data) {
    jokeArray = data;
    data.forEach((joke) => {
      renderJoke(joke);
    })
  })

// console.log(jokeArray);

// let newJokes = [];
// jokeArray.forEach(joke => {
//   newJokes.push(joke)
// })
// console.log(newJokes);

function showJokes(jokeArray){
  for(let i=0; i<0; i++) {
    console.log(i)
  }
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


const card = document.getElementsByClassName('card');
// console.log(card);

card.addEventListener('mouseover', changeColor)

function changeColor() {
  // event.target.style.color = "blue";
  // card.style.background = "blue";
setBackground("#444444");
}

card.addEventListener('click', displayDelivery);

function displayDelivery() {
  const delivery = document.createElement('p');
  delivery.innerText = joke.delivery;
  card.append(delivery);
}


const searchQuery = document.getElementById('search');
const submitBtn = document.getElementById('search-form');
const results = document.getElementById('search-results');

submitBtn.addEventListener('submit', fetchResults);

function keywordSearch(joke) {
  const searchResult = newJokeArray.filter(joke => joke.include(searchQuery));
  console.log(searchResult);
}

const searchResult = newjokeArray.filter(containsSearchQuery);

// function enhanceSearchQuery(){
// modify searchQuery to include single, pluralized, non-capital letters
  // toLowerCase(); // convert everything to lowercase
  // toUpperCase();
  // singular
  // pluralize()


// }

function containsSearchQuery(joke) {
  joke.includes(searchQuery);
}

  // jokes.append(card);
  // append card to DOM

  // else - if empty? (default to full collection)
  // If no matches, display 'No matches found"and display full joke list below.
