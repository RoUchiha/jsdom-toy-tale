let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault();
        createToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(results => {
    results.forEach(toy => addToyToDiv(toy))
  });
})

function addToyToDiv(toy) {
  let container = document.querySelector('#toy-collection');
  let toyDiv = document.createElement('div');
  toyDiv.classList.add('card');

  toyName = document.createElement('h2');
  toyName.innerHTML = `${toy.name}`;
  toyDiv.appendChild(toyName);

  toyPic = document.createElement('img');
  toyPic.src = `${toy.image}`;
  toyPic.classList.add('toy-avatar');
  toyDiv.appendChild(toyPic);

  toyLikes = document.createElement('p')
  toyLikes.innerHTML = `${toy.likes}`;
  toyDiv.appendChild(toyLikes);

  toyButton = document.createElement('button');
  toyButton.innerHTML = "Like";
  toyButton.classList.add('like-btn');
  toyButton.addEventListener('click', (like) => {
    console.log(like.target.dataset);
    likeToy(like)
  })
  toyDiv.appendChild(toyButton);

  container.appendChild(toyDiv);
}


function createToy(toy_info) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_info.name.value,
      "image": toy_info.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then((new_toy) => {
    addToyToDiv(new_toy)
  })
}


function likeToy(toy) {
  toy.preventDefault();
  let liked = parseInt(toy.target.previousElementSibling.innerHTML) + 1;

  fetch(`http://localhost:3000/toys/${toy.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": liked 
    })
  })
  .then(resp => resp.json())
  .then((likes => {
    toy.target.previousElementSibling.innerHTML = `${liked} likes`;
  }))
}