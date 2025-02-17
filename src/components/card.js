import { makeRequest } from "../scripts/api";
import { closeModal, openModal } from "./modal";

const confirmForm = document.forms["delete-confirm"];
const confirmPopUp = document.querySelector(".popup_type_delete-confirm");
let cardToDelete = null;


export const handleDelete = (cardElement) => {
  cardToDelete = cardElement;
  openModal(confirmPopUp);
};

confirmForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (cardToDelete) {

    makeRequest(`cards/${cardToDelete.id}`, "DELETE")
    .then(() => {
        console.log(`Карточка ${cardToDelete.id} удалена`);
        closeModal(confirmPopUp);
        cardToDelete.remove();
        cardToDelete = null;
    })
    .catch((error) => {
        console.error("Ошибка при удалении карточки:", error);
    })
    .finally(() => {
        console.log("Операция удаления завершена");
    });

  }
});

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
