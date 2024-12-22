// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placeContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const saveButton = document.querySelector(".popup__button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeButton = popupNewCard.querySelector(".popup__close");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_url");
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


addButton.addEventListener("click", () => {
  popupNewCard.classList.add("popup_is-opened");
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

closeButton.addEventListener("click", () => {
  popupNewCard.classList.remove("popup_is-opened");
  inputCardName.value = "";
  inputCardLink.value = "";
});
