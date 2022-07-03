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
likes.innerText = (`${joke.likes} likes`); // FIX

const likeBtn = document.createElement('button');
likeBtn.className = 'like-btn';
likeBtn.setAttribute('id', joke.id);
likeBtn.innerText = 'like ❤'; // FIX
likeBtn.addEventListener('click', event => addLike(event, joke));

// ♡ ♥

// joke.flags
  // if flags.value === true 
    // display flag
  // else 
    // display "no flags"

// append elements to card
card.append(category, jokeText, likes, likeBtn); // flags, *jokeText
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


  // Increase a joke's likes
    function addLike(event, joke) {
      const more = parseInt(joke.likes = 0) + 1;
      fetch(`http://localhost:3000/jokes/${joke.id}`, {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name":  joke.name,
          "image": joke.image,
          "likes": more
        })
      })
      .then(data => data.json())
      //.then(response => console.log(response))
      .then(response => {
        event.target.previousElementSibling.innerText = `${more} likes`})
    }