export const openModal = (children) => {
  const body = document.querySelector("body");

  const backgroundContainer = document.createElement("section");
  const mainContainer = document.createElement("section");
  const closeModalButton = document.createElement("img");
  closeModalButton.src = "assets/imgs/rick and morty x.webp"

  backgroundContainer.classList.add("modal-background");
  backgroundContainer.id = "modal_daddy";
  mainContainer.classList.add("modal-container");
  closeModalButton.classList.add("modal-close");

  closeModalButton.innerText = "X";

  backgroundContainer.addEventListener("click", (event) => {
    const { className } = event.target;
    if (className === "modal-background" || className === "modal-close") {
      backgroundContainer.remove(document.querySelector(".modal-background"));
    }
  });

  mainContainer.appendChild(closeModalButton);
  mainContainer.append(children);
  backgroundContainer.appendChild(mainContainer);
  body.appendChild(backgroundContainer);
};
