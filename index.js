const jokesContainer = document.getElementById('jokes-container');
let jokeArray;

function getJokes() {
  fetch('http://localhost:3000/jokes/')
  .then(response => response.json())
  .then(function (data) {
    jokeArray = data;
    // On initial render, send jokeArray to [ New Function - if/else for all/some jokes ]
    data.forEach((joke) => {
      renderJoke(joke);
      // console.log(jokeArray);
    })
  })
}

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

// card.addEventListener('click', changeColor) // mouseover

// function changeColor() {
//   card.classList.toggle('card-delivery');
// }

// card.addEventListener('click', displayDelivery);

function displayDelivery(joke, e) {
  e.preventDefault();
  e.target.innerText === joke.setup ? e.target.innerText = joke.delivery : e.target.innerText = joke.setup;

  // const delivery = document.createElement('p');
  // delivery.innerText = joke.delivery;
  // card.append(delivery);
  // e.target.innerText = joke.delivery;
  //// console.log(joke, e);
}

const searchQuery = document.getElementById('search');
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', event => searchJokes(event));

function searchJokes(event, searchQuery = "all") {
  event.preventDefault();
  console.log(event.target.value);
  // #1. if searchQuery === all, render all jokes
  // #2. else (iterate over filtered array and) render filtered jokes (search result).
  // clear joke container btw renders.

  // const searchResult = newJokeArray.filter(joke => joke.include(searchQuery));
}

// const searchResult = newjokeArray.filter(containsSearchQuery);

// // function enhanceSearchQuery(){
// // modify searchQuery to include single, pluralized, non-capital letters
//   // toLowerCase(); // convert everything to lowercase
//   // toUpperCase();
//   // singular
//   // pluralize()


// // }

// function containsSearchQuery(joke) {
//   joke.includes(searchQuery);
// }

//   // jokes.append(card);
//   // append card to DOM

//   // else - if empty? (default to full collection)
//   // If no matches, display 'No matches found"and display full joke list below.

document.addEventListener("DOMContentLoaded", () => {
  getJokes();
})
