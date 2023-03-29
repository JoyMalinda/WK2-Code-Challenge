const animalList = document.querySelector("#animal-list");

//GET rquest to get animal details
fetch("http://localhost:3000/characters")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((animal) => {
      const animalListItem = document.querySelector("li");
      animalListItem.innerHTML = `
        <a href="#" data-id="${animal.id}">${animal.name}</a>
      `;
      animalList.appendChild(animalListItem);
    });
  });


  const animalDetails = document.querySelector("#animal-details");

  // An event listener that listens for click events
  animalList.addEventListener("click", (event) => {
    event.preventDefault();
  
    const animalId = event.target.dataset.id;

    // GET request to retrieve the data of the animal with the corresponding id
    fetch(`http://localhost:3000/characters/${animalId}`)
      .then((response) => response.json())
      .then((animal) => {
        animalDetails.innerHTML = `
          <h2>${animal.name}</h2>
          <img src="${animal.image}" alt="${animal.name}">
          <p>Votes: ${animal.votes}</p>
          <button id="vote-button">Vote</button>
        `;

        // An event listener that increases the animal's votes and updates the animal-details
        const voteButton = document.querySelector("#vote-button");
        voteButton.addEventListener("click", () => {
          animal.votes++;
          animalDetails.innerHTML = `
            <h2>${animal.name}</h2>
            <img src="${animal.image}" alt="${animal.name}">
            <p>Votes: ${animal.votes}</p>
            <button id="vote-button">Vote</button>
          `;
        });
      });
  });

  const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
  characters.forEach(character => {
    character.votes = 0;
    const voteCount = document.querySelector(`p`);
    voteCount.innerText = characterVotes;
  });
});
