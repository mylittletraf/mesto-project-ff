import '../pages/index.css';
import {initialCards} from './cards'
import {createCard, handleDelete, handleLike, handleOpenImage} from '../components/card.js';
import {closeModal, openModal} from '../components/modal'


const placeContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profile = document.querySelector(".profile__info")
const profileForm = document.forms["edit-profile"]
const cardForm = document.forms["new-place"]
const popUpImage = document.querySelector(".popup_type_image");


initialCards.forEach((cardItem) => {
    const newCard = createCard(cardItem, handleDelete, handleLike, handleOpenImage, popUpImage, openModal);
    placeContainer.append(newCard);
});

addButton.addEventListener("click", () => {
    openModal(popupNewCard);
});

profileEditButton.addEventListener("click", () => {
    openModal(popupProfileEdit);
    fillProfileForm(profileForm);
})

document.addEventListener("keydown", (evt) => {
    if (evt.key === "+") {
        openModal(popupNewCard);
    }
})

document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
        closeModal(evt.target.closest(".popup_is-opened"));
    }

    if (evt.target.classList.contains("popup")) {
        closeModal(evt.target);
    }
})

profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    saveProfileForm(profileForm, profile)
    closeModal(popupProfileEdit);
})

cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const inputPlaceName = cardForm.elements["place-name"].value;
    const inputUrl = cardForm.elements.link.value;
    const cardItem = {"name": inputPlaceName, "link": inputUrl};
    const addCard = createCard(cardItem, handleDelete, handleLike, handleOpenImage, popUpImage, openModal);
    placeContainer.prepend(addCard);
    closeModal(popupNewCard);
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

