document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    buildAddJoke(e.target.new_joke_setup.value)
    buildAddJoke(e.target.new_joke_delivery.value)
    form.reset()
  })
})

function buildAddJoke(newJoke) {
  let p = document.createElement('p')
  let btn = document.createElement('button') // btn
  btn.addEventListener('click', handleDelete) // btn
  btn.textContent = 'x' // btn
  p.textContent = `${newJoke} `  
  p.appendChild(btn) // btn
  document.querySelector('#joke_container').appendChild(p)
}

function handleDelete(e) {
  e.target.parentNode.remove()
}