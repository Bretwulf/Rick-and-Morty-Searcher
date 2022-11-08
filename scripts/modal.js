const openModal = (children) => {
  const body = document.querySelector("body");

  const backgroundContainer = document.createElement("section");
  const mainContainer = document.createElement("section");
  const closeModalButton = document.createElement("button");

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
  const clone = children.cloneNode(true);
  clone.classList.add("modal_clone");

  mainContainer.appendChild(closeModalButton);
  mainContainer.append(clone);
  backgroundContainer.appendChild(mainContainer);
  body.appendChild(backgroundContainer);
};

const getCurrentProduct = () => {
  setTimeout(() => {
    const liCards = document.querySelectorAll(".event");
    liCards.forEach((product) => {
      product.addEventListener("click", () => {
        openModal(product);
      });
    });
  }, 1000);
};

getCurrentProduct();
