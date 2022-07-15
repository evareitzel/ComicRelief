const jokesContainer = document.getElementById('jokes-container');
let jokeArray;

function getJokes() {
  fetch('http://localhost:3000/jokes/')
  .then(response => response.json())
  .then(function (data) {
    jokeArray = data;
    // On initial render, send jokeArray to [ New Function - if/else for all/some jokes ]

    // data.forEach(searchJokes)});

    // data.forEach((joke) => {
    // searchJokes(joke);

    data.forEach((joke) => {
      renderJoke(joke);
      console.log(jokeArray);
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

const input = document.getElementById('search');
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  console.log(event);
  searchJokes(event)
});

// function searchJokes(event, input = "all") {
//   event.preventDefault();
//   console.log(event.target.value);
//   if (input === "all") {
//     renderJoke();
//   } else {
//     forEach(joke)
//       if joke.includes(input) {
//       renderJoke(joke);
//     }
//     }
  
  // #1. if input === all, render all jokes
  // #2. else (iterate over filtered array and) render filtered jokes (search result).
  // clear joke container btw renders.

  // const searchResult = newJokeArray.filter(joke => joke.include(searchQuery));
// }

// const searchResult = newjokeArray.filter(containsInput);

// function enhanceInput(){
// modify input to include single, pluralized, non-capital letters
  // toLowerCase(); // convert everything to lowercase
  // toUpperCase();
  // singular
  // pluralize()
// }

// function containsInput(joke) {
//   joke.includes(input);
// }

//   // jokes.append(card);
//   // append card to DOM

//   // else - if empty? (default to full collection)
//   // If no matches, display 'No matches found"and display full joke list below.

document.addEventListener("DOMContentLoaded", () => {
  getJokes();
})


// from addJokeForm event listener
addJokeFormHandler(event.target.addJokeCategory.value)
addJokeFormHandler(event.target.addJokeSetup.value)
addJokeFormHandler(event.target.addJokeDelivery.value)
console.log(event.target.addJokeForm.value)
console.log("an event happened");
// console.log(event.target.addJokeCategory)
// console.log(event.target.addJokeSetup.value)
// console.log(event.target.addJokeDelivery.value)