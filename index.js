// ♡ Eva's code goes here ♡
jokeCollection = document.querySelector('#joke-collection');
// console.log(jokeCollection);

// Fetch info
  fetch('http://localhost:3000/jokes/')
  .then(response => response.json())
  // .then(data => console.log(data));
  .then(function (data) {
    data.forEach((joke) => {
      renderJoke(joke);
    })
  })
  console.log(joke);

function renderJoke(joke) {
// Create card
const card = document.createElement('div');
card.className = 'card';
// Create inner card elements
const category = document.createElement('h3');
category.innerText = joke.category;

// console.log(joke.category);

const jokeText = document.createElement('p');
jokeText.innerText = "Lorem ipsum dolor sit amet";
// console.log(jokeText);

  // joke.type
    // if single --> 
      // - joke.joke
    // if twopart --> 
      // joke.setup
      // joke. delivery

const likes = document.createElement('p');
likes.innerText = (`${joke.likes} likes`);

// const likeBtn = document.createElement('button');
// likeBtn.className = 'like-btn';

// joke.flags
  // if flags.value === true 
    // display flag
  // else 
    // display "no flags"

// append elements to card
card.append(category, jokeText, likes); // likeBtn, flags, fix jokeText
// append card to DOM
jokeCollection.append(card);
}

// Add a new joke
  // form input
  // function with fetch
  // function renderNewJoke
  // create inner card elements
  // append elements to card
  // append card to dom


  // Increase likes
    // function with fetch