// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import {initialCards} from './cards'

const placeContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const saveButton = document.querySelector(".popup__button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const inputCardName = popupNewCard.querySelector(".popup__input_type_card-name");
const inputCardLink = popupNewCard.querySelector(".popup__input_type_url");
const cardList = initialCards;


const handleDelete = (cardElement) => {
  cardElement.remove();
};


const createCard = (item, handleDelete) => {
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate
    .querySelector(`.places__item`)
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = `Фото карточки с названием ${item.name}`;
  cardElement.querySelector(".card__title").textContent = item.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      handleDelete(cardElement);
    });

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-button_is-active");
    });

  return cardElement;
}

cardList.forEach((cardItem) => {
  const newCard = createCard(cardItem, handleDelete);
  placeContainer.append(newCard);
});




saveButton.addEventListener("click", () => {
  const cardName = inputCardName.value;
  const cardLink = inputCardLink.value;

  const newCardForm = createCard({
    name: cardName,
    link: cardLink,
  },handleDelete);
  placeContainer.append(newCardForm);

  popupNewCard.classList.toggle("popup_is-opened");

  inputCardName.value = "";
  inputCardLink.value = "";

});


addButton.addEventListener("click", () => {openPopup(popupNewCard);});
profileEditButton.addEventListener("click", () => {openPopup(popupProfileEdit);})


document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(evt.target.closest(".popup_is-opened"));
  }

  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
})

function openPopup(popup) {
  if (popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscClose);
  }
}

function closePopup(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
  }
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// closeButton.addEventListener("click", () => {
//   popupNewCard.classList.remove("popup_is-opened");
//   inputCardName.value = "";
//   inputCardLink.value = "";
// });

