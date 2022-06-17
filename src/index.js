document.addEventListener("DOMContentLoaded", () => {
  // GLOBAL VARIABLES //
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const form = document.querySelector(".add-toy-form");
  const inputText = document.getElementsByClassName("input-text");
  const toyURL = "http://localhost:3000/toys";

  // *GET TOYS* //
  // Function that passes in each toy & renders their data on the cards //
  function renderToy(toy) {
    const card = document.createElement("div");
    const toyName = document.createElement("h2");
    const toyImg = document.createElement("img");
    const toyLikes = document.createElement("p");
    const likeButton = document.createElement("button");

    // Assign Classes //
    likeButton.classList = "like-btn";
    likeButton.id = toy.id;
    toyLikes.classList = "toy-likes";
    toyName.classList = "toy-name";
    card.classList = "card";
    toyImg.classList = "toy-avatar";

    // Add TextContent //
    toyName.innerHTML = toy.name;
    toyLikes.innerHTML = `${toy.likes} likes`;
    toyImg.src = toy.image;
    likeButton.innerHTML = `Like ♡`;

    // Append Items //
    card.appendChild(toyName);
    card.appendChild(toyImg);
    card.appendChild(toyLikes);
    card.appendChild(likeButton);
    toyCollection.append(card);
  }
  // Function using forEach to add each toy to the cards
  function renderToys(data) {
    toyCollection.innerHTML = ``;
    data.forEach((toy) => renderToy(toy));
  }

  // Function fetching the toys and passing the fetched data
  // into the renderToys function
  function fetchToys() {
    fetch(toyURL)
      .then((resp) => resp.json())
      .then((data) => {
        renderToys(data);
      });
  }
  fetchToys();

  // ------------------------------------------------------------//
  // * POST TOY(S) * //
  function postToy(e) {
    e.preventDefault();

    const toyData = {
      name: e.target["name"].value,
      image: e.target["image"].value,
      likes: 0,
    };
    e.target.reset();

    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "appplication/json",
      },
      body: JSON.stringify(toyData),
    };

    fetch(toyURL, headers)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        renderToy(data);
      });
  }

  // SUBMIT FORM EVENT LISTENER //
  function submitForm() {
    form.addEventListener("submit", postToy);
  }
  submitForm();

  // ADD A NEW TOY BUTTON //
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // INCREASE A TOY'S LIKES //

  function clickLike(e) {
    console.log(e.target.parentElement.dataset.id)
    const toyID = e.target.id;
    const numLikes = e.target.parentElement.getElementsByClassName('toy-likes')[0]
    // const likeButton = document.getElementsByClassName("like-btn");
    let likeCount = parseInt(
      e.target.parentElement.children[2].innerText.split(" ")[0]
    );
    likeCount++
    
    const likeNum = {
      likes: likeCount,
    };

    numLikes.textContent = `${likeCount} likes`

    const headers = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(likeNum),
    };

    fetch(`${toyURL}/${toyID}`, headers)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => console.log(data));
  }

  document.addEventListener("click", (e) => {
    if (e.target.className === "like-btn") {
      clickLike(e);
    }
  });
  // -------------------------------------------------------------//
  // BOTTOM //
});

// -------------------------- 1ST TRY ---------------------------//
// RAN INTO ISSUES BECAUSE OF SCOPE, NEEDED TO CHUNK THE FUNCTIONS//
// MAIN FUNCTION //
// document.addEventListener("DOMContentLoaded", () => {
// VARIABLES WITHIN THE DOMContentLoaded Function //

// const addBtn = document.querySelector("#new-toy-btn");
// const toyFormContainer = document.querySelector(".container");
// //
// const toyCollection = document.querySelector("#toy-collection");
// const form = document.querySelector(".add-toy-form")

// // ADD A NEW TOY BUTTON //
// addBtn.addEventListener("click", () => {
//   // hide & seek with the form
//   addToy = !addToy;
//   if (addToy) {
//     toyFormContainer.style.display = "block";
//   } else {
//     toyFormContainer.style.display = "none";
//   }
// });

// function getToys() {
// fetch("http://localhost:3000/toys")
//   .then((resp) => resp.json())
//   .then((data) => {

//     data.forEach((toy) => {
//       // Define Variables //
//       const card = document.createElement("div");
//       const toyName = document.createElement("h2");
//       const toyImg = document.createElement("img");
//       const toyLikes = document.createElement("p");
//       const likeButton = document.createElement("button");

//       // Assign Classes //
//       likeButton.classList = "like-btn";
//       likeButton.id = "[toy_id]";
//       toyLikes.classList = "toy-likes";
//       toyName.classList = "toy-name";
//       card.classList = "card";
//       toyImg.classList = "toy-avatar";

//       // console.log(toy.name)
//       // console.log(toy.image)
//       // console.log(toy.likes)

//       // Add TextContent //
//       toyName.innerHTML = toy.name;
//       toyLikes.innerHTML = `${toy.likes} likes`;
//       toyImg.src = toy.image;
//       likeButton.innerHTML = `Like ♡`;

//       // Append Items //
//       card.appendChild(toyName);
//       card.appendChild(toyImg);
//       card.appendChild(toyLikes);
//       card.appendChild(likeButton);
//       toyCollection.append(card);
//     });
//   });
// }
// getToys();

// function postToys(){

// form.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const toyData = {
//     name: e.target['name'].value,
//     image: e.target['image'].value,
//     likes: 0
//   }
//   e.target.reset()

// const inputText = document.getElementsByClassName('input-text')

// fetch("http://localhost:3000/toys", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "appplication/json",
//   },
//   // *** NOT WORKING ***
//   body: JSON.stringify(toyData),
// })
//   .then((resp) => {
//     return resp.json()
//   })
//   .then((data) => {
//     console.log(data)
//     })
//   });
// }
// postToys()
