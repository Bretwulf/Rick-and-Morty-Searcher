import { openModal } from "./modal.js";

let nextPage = "";



export async function getChars(param) {
  const options = { method: "GET" };

  /* -------------------------------------------------------------------------- */
  try {
    const response = await fetch(
      param, //parametro aqui é a própria URL!
      options
    );

    if (response.ok) {
      const chars = await response.json();
      return chars;
    } else {
      const error = await response.json();
      throw Error(error.error);
    }
  } catch (error) {
    return error.message;
  }
}


export async function getEpisode(param) {
  const options = { method: "GET" };

  try {
    const response = await fetch(`${param}`, options);

    if (response.ok) {
      const episode = await response.json();
      return episode;
    } else {
      const error = await response.json();
      throw Error(error.error);
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function observer() {
  document
    .querySelector("main")
    .insertAdjacentHTML("beforeend", "<div id='observer'></div>");
  const cardsSection = document.getElementById("cardsSection");

  let observer = new IntersectionObserver(async (entries) => {
    if (
      entries[0].isIntersecting === true &&
      cardsSection.children.length !== 0
    ) {
      if (nextPage !== null) {
        await renderCards(nextPage);
      }
    }
  });
  observer.observe(document.getElementById("observer"));
}

export async function renderCards(param, param2) {
  //parametro1 é a URL inteira de como os personagens devem ser renderizados! Você pode construir uma string com a URL+filtros e passar eles como parâmetro! facilimo!
  const cardSection = document.getElementById("cardsSection");
  /*esse if deve ser usado pra decidir se o código 
reseta a página ou só adiciona conteúdo. Como underfined 
é uma falsie, por padrão é falso!.*/
  const characters = await getChars(param);
  if (param2 === true) {
    cardSection.innerHTML = "";
  }
  if (characters === "There is nothing here") {
    nextPage = null;
    cardSection.innerHTML =
      "<div class='font-color-adaptable font32 font-black'>Não há nenhum resultado para sua busca.</div>";
  } else {
    nextPage = characters.info.next;
    
    characters.results.forEach(async (element) => {
      const firstSeen = await getEpisode(element.episode[0]);
      cardSection.insertAdjacentHTML(
        "beforeend",
        `
        <li id="card${element.id}" class="card-base animate__animated animate__fadeInUp animate__fast event">
        <div class="image-div">
         <img class="card-image" src=${element.image}>
         <p class="text-center font16 font-regular font-color-adaptable species-pip">${element.species}</p>
        </div>
        <div class="card-content">
            <h4 class="font20 font-regular font-color-adaptable">${element.name}</h4>
            <div class="status-pip font12 font-thin font-color-white-fixed">${element.status}</div>
            <p class="font12 font-thin font-color-adaptable">last known location:</p>
            <p class="font16 font-regular font-color-adaptable">${element.location.name}</p>
            <p class="font12 font-thin font-color-adaptable">first seen in</p>
            <p class="font16 font-regular font-color-adaptable">${firstSeen.name}</p>
        </div>
        </li>
        `
      );

      document
        .getElementById(`card${element.id}`)
        .addEventListener("click", () => {
          const contentModal = document.createElement("div");
          contentModal.classList.add("container_content");
          contentModal.id = "list_modal";
          contentModal.insertAdjacentHTML(
            "beforeend",
            `
            <div class="header_image">
            <img src="${element.image}" alt="">
            <h3 class="specie">${element.species} </h3>
            </div>
            <div class="content_modal">
            <p class="font16 font-regular font-color-adaptable"><span class="font16 font-regular font-color-adaptable">Name:</span> ${element.name} </p>
            
            <div class="paragraphs">
            <span class="font16 font-regular font-color-adaptable">Status:</span>
           
            <p class="status-pip font12 font-thin font-color-white-fixed stt" >  ${element.status} </p>
            </div>
            <p class="font16 font-regular font-color-adaptable"><span class="font16 font-regular font-color-adaptable">Last know location:</span> ${element.location.name} </p>
            <p class="font16 font-regular font-color-adaptable"><span class="font16 font-regular font-color-adaptable">First seen in:</span> ${firstSeen.name} </p>
            </div>
          
          `
          );
          if (element.status === "Dead") {
            document
              .getElementById(`card${element.id}`)
              .querySelector(".stt")
              .classList.add("status-pip-dead");
          } else if (element.status === "unknown") {
            document
              .getElementById(`card${element.id}`)
              .querySelector(".stt")
              .classList.add("status-pip-unknown");
          }

          openModal(contentModal);
        });

      /* -------------------------------------------------------------------------- */
      if (element.species === "Mythological Creature") {
        document
          .getElementById(`card${element.id}`)
          .querySelector(".species-pip")
          .classList.add("species-pip-mythological-creature");
      } else {
        document
          .getElementById(`card${element.id}`)
          .querySelector(".species-pip")
          .classList.add(`species-pip-${element.species.toLowerCase()}`);
      }
      /* -------------------------------------------------------------------------- */
      if (element.status === "Dead") {
        document
          .getElementById(`card${element.id}`)
          .querySelector(".status-pip")
          .classList.add("status-pip-dead");
      } else if (element.status === "unknown") {
        document
          .getElementById(`card${element.id}`)
          .querySelector(".status-pip")
          .classList.add("status-pip-unknown");
      }
    });
  }
}

