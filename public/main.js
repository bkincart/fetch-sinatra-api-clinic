function fetchDogs() {
  fetch('/api/v1/dogs')
  .then(response => {
    if(response.ok) {
      return response
    } else {
      let error = new Error(`Error in fetch: GET 'api/v1/dogs'`)
      throw(error)
    }
  })
  .then(response => response.json())
  .then(jsonDogs => jsonDogs.dogs)
  .then(dogs => appendDogs(dogs))
  .catch(error => {
    document.getElementById('error').innerHTML += error.message
  })
}

function appendDogs(dogs) {
  let dogList = document.getElementById('dogs')
  dogs.forEach((dog) => {
    dogList.innerHTML += `<li>${dog.breed}</li>`
  })
}

function postDog() {
  event.preventDefault();
  let breedInput = document.getElementById('breed')
  let dogBreed = {
    dog: {
      breed: breedInput.value
    }
  }
  let dogData = JSON.stringify(dogBreed)

  fetch('/api/v1/dogs', {
    method: 'post',
    body: dogData
  })
  .then(response => {
    if(response.ok) {
      let dog = dogBreed.dog
      appendDog(dog);
      breedInput.value = ''
    } else {
      let error = new Error(`Error in fetch: POST 'api/v1/dogs'`)
      throw(error)
    }
  })
  .catch(error => {
    document.getElementById('error').innerHTML += error.message
  })
}

function appendDog(dog) {
  let dogList = document.getElementById('dogs')
  dogList.innerHTML += `<li>${dog.breed}</li>`
}

// run automatically on page load
fetchDogs()

// run when button is clicked
document
  .getElementById('new-dog-submit-button')
  .addEventListener('click', postDog)
