import {makeRequest} from "../scripts/api";


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
  const deleteButton = cardElement.querySelector(".card__delete-button");

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
    deleteButton.addEventListener("click", () => handleDelete(cardElement));
  } else {
    deleteButton.remove();
  }

  likeButton.textContent = Array.isArray(item.likes) ? item.likes.length : 0;

  if (item.likes.some((item) => item._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
};
