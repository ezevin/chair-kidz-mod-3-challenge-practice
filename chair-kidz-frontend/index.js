const allKidsLink = `http://localhost:3000/api/v1/kids`
const chairKidLink = `http://localhost:3000/api/v1/kids/chair`
const voteKidLink = `http://localhost:3000/api/v1/kids/vote`
const throneKidLink = `http://localhost:3000/api/v1/kids/throne`

//your code here

// see all kids in drop down //
const kidz = document.getElementById("kid-options")
const chairsContainer = document.getElementById("chairs-container")


const displayChairKidz = function(kid){
  // debugger
  chairsContainer.innerHTML +=
  `<div id=${kid.id} class="kid-chair-container">
    <img class="image" src=${kid.attributes["img-url"]} />
    <br>
    <br>
    <div data-id=${kid.id} class="attribute">
    ${kid.attributes.name}
    <br>
    <div id="score-${kid.id}">
    Score: ${kid.attributes.votes}
    </div>
    <br>
    <a class="vote-down" href="#">Vote Down</a> | <a class="vote-up" href="#">Vote Up</a>
    <br>
    <a class="hide" href="#">Hide</a>
    </div>
  </div>`
}


fetch(allKidsLink)
  .then(res => res.json())
  .then(res => {res.data.forEach(kid => {
    if (kid.attributes["in-chair"] === true){
      displayChairKidz(kid)
    }
    else {
      kidz.innerHTML += `<option id="chair-kid-${kid.id}" value=${kid.id}>${kid.attributes.name} </option>`
    }
    })
  })

// end see all kids in drop down //

// add kids to chair //
const kidContainer = document.getElementById("add-kid-container")

kidContainer.addEventListener("click", function(e){
  e.preventDefault()
  let kidId = document.getElementById("kid-options").value


  if (e.target.id === "add-kid"){
    fetch(chairKidLink, {
      method: "PATCH",
      headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify({kid_id: kidId})
      })
      .then(res => res.json())
      .then(res => {
        chairsContainer.innerHTML +=
        `<div id=${res.data.id} class="kid-chair-container">
          <img class="image" src=${res.data.attributes["img-url"]} />
          <br>
          <br>
          <div data-id=${res.data.id} class="attribute">
          ${res.data.attributes.name}
          <br>
          <div id="score-${res.data.id}">
          Score: ${res.data.attributes.votes}
          </div>
          <br>
          <a class="vote-down" href="#">Vote Down</a> | <a class="vote-up" href="#">Vote Up</a>
          <br>
          <a class="hide" href="#">Hide</a>
          </div>
        </div>`
      })
      // end add kids to chair //

      // remove from dropdown //
    document.getElementById(`chair-kid-${kidId}`).remove()
     // end remove from dropdown //
  }
})

      // vote count //
        // add kid to throne //
const throneDiv = document.getElementById("throne");
chairsContainer.addEventListener("click", function(e){
  e.preventDefault()
  let kidId = e.target.parentElement.dataset.id
  let score = document.getElementById(`score-${kidId}`)
  if (e.target.className === "vote-up"){

    let chairKid = e.target.parentElement;
    fetch(voteKidLink, {
      method: "PATCH",
      headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
      body: JSON.stringify({kid_id: kidId,
                            vote: "up"})
      }).then(res => res.json())
        .then(res => {
          score.innerHTML = `Score: ${res.data.attributes.votes} `
          if (res.data.attributes.votes === 5) {
            fetch(throneKidLink, {
              method: "PATCH",
              headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
              },
              body: JSON.stringify({kid_id: kidId})
              })
              .then(res => res.json())
              .then(res => {
                innerThroneDiv = document.createElement("div")
                innerThroneDiv.id = res.data.id
                throneDiv.appendChild(innerThroneDiv)
                throneImg = document.createElement("img")
                throneImg.className += "image"
                throneImg.src = res.data.attributes["img-url"]
                innerThroneDiv.appendChild(throneImg)
                console.log(throneDiv.childElementCount);
              })
            if (throneDiv.childElementCount === 1 ) {

              Array.from(throneDiv.children).shift()
              chairsContainer.appendChild()
               Array.from(throneDiv.children).shift().remove()
            }
          }

        })

  }

  if (e.target.className === "vote-down"){
    let chairKid = e.target.parentElement;
    fetch(voteKidLink, {
      method: "PATCH",
      headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify({kid_id: kidId,
                            vote: "down"})
    }).then(res => res.json())
      .then(res => {
        const score = document.getElementById(`score-${res.data.id}`)
        score.innerHTML = `Score: ${res.data.attributes.votes} `
      })
  }
})
      // end vote count //

      // add kid to throne //


      // end add kid to throne //
