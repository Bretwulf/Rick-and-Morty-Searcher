const openModal = (children) => {
  const body = document.querySelector("body");

  const backgroundContainer = document.createElement("section");
  const mainConatiner = document.createElement("section");
  const closeModalButton = document.createElement("button");

  backgroundContainer.classList.add("modal-background");
  backgroundContainer.id = "modal_daddy";
  mainConatiner.classList.add("modal-container");
  closeModalButton.classList.add("modal-close");

  closeModalButton.innerText = "X";

  backgroundContainer.addEventListener("click", (event) => {
    const { className } = event.target;
    if (className === "modal-background" || className === "modal-close") {
      backgroundContainer.remove();
    }
  });

  mainConatiner.appendChild(closeModalButton);
  mainConatiner.append(children);
  backgroundContainer.appendChild(mainConatiner);
  body.appendChild(backgroundContainer);
};

const baseUrl = "https://rickandmortyapi.com/api/character/2";

export const getPerson = async () => {
  const request = await fetch(`${baseUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();

  console.log(response);

  return response;
};

export const renderCard = async () => {
  const person = await getPerson();

  const ul = document.querySelector(".list_persons");
  const li = document.createElement("li");
  const img = document.createElement("img");
  const h3Name = document.createElement("h3");
  const pStatus = document.createElement("p");
  const pSpecies = document.createElement("p");
  const pGender = document.createElement("p");

  img.src = person.image;
  h3Name.innerText = person.name;
  pStatus.innerText = `Status: ${person.status}`;
  pSpecies.innerText = `Species: ${person.species}`;
  pGender.innerText = `Gender: ${person.gender}`;

  const div = document.createElement("div");
  div.insertAdjacentHTML(
    "beforeend",
    `
   

   <img src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" alt="">
    <h3>${person.name}</h3>
    <p>status: ${person.status}</p>
    <p>Specie: ${person.species}</p>
    <p>Gender: ${person.gender}</p>
   
   `
  );

  ul.addEventListener("click", () => {
    openModal(div);
  });
  li.append(img, h3Name, pStatus, pSpecies, pGender);

  ul.append(li);
};
