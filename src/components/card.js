import { makeRequest } from "../scripts/api";
import { closeModal, openModal } from "./modal";

const confirmForm = document.forms["delete-confirm"];
const confirmPopUp = document.querySelector(".popup_type_delete-confirm");

export const handleDelete = (cardElement) => {
  openModal(confirmPopUp);
  confirmForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    deleteCard(`cards/${cardElement.id}`, cardElement);
    closeModal(confirmPopUp);
    cardElement.remove();
  });
};

export const handleLike = (evt) => {
  const likeButton = evt.target;
  const cardElement = likeButton.closest(".card");
  const cardId = cardElement.id;

  if (likeButton.classList.contains("card__like-button_is-active")) {
    interactLike(`cards/likes/${cardId}`, "DELETE", cardElement)
      .then(() => {
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.error("Ошибка при удалении лайка:", err);
      });
  } else {
    interactLike(`cards/likes/${cardId}`, "PUT", cardElement)
      .then(() => {
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.error("Ошибка при добавлении лайка:", err);
      });
  }
};

function deleteCard(endpoint, cardElement) {
  makeRequest(endpoint, "DELETE").then(() => {
    console.log(`Карточка ${cardElement.id} удалена`);
  });
}

function interactLike(endpoint, method, cardElement) {
  return makeRequest(endpoint, method).then((data) => {
    console.log(`Лайк ${method === "PUT" ? "поставлен" : "удален"}`, data);
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.textContent = data.likes.length;
  });
}

export const createCard = (
  item,
  handleDelete,
  handleLike,
  handleOpenImage,
  popUpImage,
  openModal,
  userId
) => {
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate
    .querySelector(`.places__item`)
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = `Фото карточки с названием ${item.name}`;
  cardElement.id = item._id;
  cardElement.querySelector(".card__title").textContent = item.name;

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", handleLike);

  cardImage.addEventListener("click", (evt) =>
    handleOpenImage(evt, popUpImage, openModal)
  );

  if (item.owner._id === userId) {
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => handleDelete(cardElement));
  } else {
    cardElement.classList.remove("card__delete-button");
  }

  likeButton.textContent = Array.isArray(item.likes) ? item.likes.length : 0;

  if (item.likes.some((item) => item._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
};
