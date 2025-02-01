import '../pages/index.css';
import {initialCards} from './cards'
import {createCard, handleDelete, handleLike} from '../components/card.js';
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
const popUpImg = popUpImage.querySelector(".popup__image")
const popUpCaption = popUpImage.querySelector(".popup__caption")
const popups = document.querySelectorAll('.popup')
const profileTitle = profile.querySelector(".profile__title")
const profileDesc = profile.querySelector(".profile__description")


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

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
            closeModal(popup);
        }
    });
});

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

function handleOpenImage(evt, popUpImage, openModal) {
    openModal(popUpImage);

    const cardImage = evt.target.closest('.card').querySelector('.card__image');
    const cardTitle = evt.target.closest('.card').querySelector('.card__title');

    popUpImg.src = cardImage.src;
    popUpImg.alt = cardImage.alt;
    popUpCaption.textContent = cardTitle.textContent;
}

function saveProfileForm(profileForm) {
    profileTitle.textContent = profileForm.name.value
    profileDesc.textContent = profileForm.description.value
}

function fillProfileForm(form) {
    form.elements.name.value = profileTitle.textContent
    form.elements.description.value = profileDesc.textContent
}