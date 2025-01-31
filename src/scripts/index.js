import '../pages/index.css';
import {initialCards} from './cards'

const placeContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profile = document.querySelector(".profile__info")
const profileForm = document.forms["edit-profile"]
const cardForm = document.forms["new-place"]
const popUpImage = document.querySelector(".popup_type_image");
const cardList = initialCards;


const handleDelete = (cardElement) => {
  cardElement.remove();
};

const handleLike = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const handleOpenImage = (evt) => {
  openPopup(popUpImage)

  const cardImage = evt.target.closest('.card').querySelector('.card__image');
  const cardTitle = evt.target.closest('.card').querySelector('.card__title');

  popUpImage.querySelector(".popup__image").src = cardImage.src;
  popUpImage.querySelector(".popup__caption").textContent = cardTitle.textContent;
}

const createCard = (item, handleDelete, handleLike, handleOpenImage) => {
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
      handleLike(evt);
    });

  cardElement.querySelector(".card__image")
      .addEventListener("click", (evt) => {
        handleOpenImage(evt);
      });

  return cardElement;
};

cardList.forEach((cardItem) => {
  const newCard = createCard(cardItem, handleDelete, handleLike, handleOpenImage);
  placeContainer.append(newCard);
});

addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

profileEditButton.addEventListener("click", () => {
  openPopup(popupProfileEdit);
  fillProfileForm(profileForm);
})

document.addEventListener("keydown", (evt) => {
  if (evt.key === "+") {
    openPopup(popupNewCard);
  }
})

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(evt.target.closest(".popup_is-opened"));
  }

  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
})

profileForm.addEventListener("submit",(evt) => {
  evt.preventDefault();
  saveProfileForm(profileForm, profile)
  closePopup(popupProfileEdit);
})

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputPlaceName = cardForm.elements["place-name"].value;
  const inputUrl = cardForm.elements.link.value;
  const cardItem = {"name": inputPlaceName, "link": inputUrl};
  const addCard = createCard(cardItem, handleDelete, handleLike, handleOpenImage);
  placeContainer.prepend(addCard);
  closePopup(popupNewCard);
  cardForm.reset();
})

function saveProfileForm(profileForm, profile) {
  profile.querySelector(".profile__title").textContent = profileForm.name.value
  profile.querySelector(".profile__description").textContent = profileForm.description.value
}

function fillProfileForm(form) {
  form.elements.name.value = profile.querySelector(".profile__title").textContent
  form.elements.description.value = profile.querySelector(".profile__description").textContent
}

function openPopup(popup) {
  if (popup) {
    popup.classList.add("popup_is-animated");
    setTimeout(() => {
      popup.classList.add("popup_is-opened");
    }, 10);
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
