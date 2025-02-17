import "../pages/index.css";
import { clearValidation, enableValidation } from "./validation";
import { createCard, handleDelete, handleLike } from "../components/card.js";
import { closeModal, openModal } from "../components/modal";
import { makeRequest } from "./api.js";

const selectorList = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  inputErrorField: "popup__input_type-error",
};

const placeContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profile = document.querySelector(".profile__info");
const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];
const avatarForm = document.forms["update_avatar"];
const popUpImage = document.querySelector(".popup_type_image");
const popUpImg = popUpImage.querySelector(".popup__image");
const popUpCaption = popUpImage.querySelector(".popup__caption");
const popUpUpdateAvatar = document.querySelector(".popup_type_update_avatar");
const popups = document.querySelectorAll(".popup");
const profileTitle = profile.querySelector(".profile__title");
const profileDesc = profile.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const popUpButton = document.querySelector(".popup__button");


addButton.addEventListener("click", () => {
  clearValidation(popupNewCard, selectorList);
  openModal(popupNewCard);
});

profileEditButton.addEventListener("click", () => {
  clearValidation(popupProfileEdit, selectorList);
  fillProfileForm(profileForm);
  openModal(popupProfileEdit);
});

profileImage.addEventListener("click", () => {
  clearValidation(popUpUpdateAvatar, selectorList);
  openModal(popUpUpdateAvatar);
  fillAvatarForm(avatarForm);
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "+") {
    openModal(popupNewCard);
  }
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const profileInfo = {
    name: profileForm.name.value,
    about: profileForm.description.value,
  };
  makeRequest("users/me", "PATCH", profileInfo)
    .then((data) => {
        updateProfileHead(data);
        closeModal(popupProfileEdit);
    })
    .catch((err) => {
        console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
        isLoading(false);
    });

});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  makeRequest("users/me/avatar", "PATCH", { avatar: avatarForm.link.value })
    .then((data) => {
        updateProfileHead(data);
        closeModal(popUpUpdateAvatar);
    })
    .catch((err) => {
        console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
        isLoading(false);
    });

});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputPlaceName = cardForm.elements["place-name"].value;
  const inputUrl = cardForm.elements.link.value;
  const cardItem = { name: inputPlaceName, link: inputUrl };
  addNewCard("/cards", cardItem);
  closeModal(popupNewCard);
  cardForm.reset();
});

function handleOpenImage(evt, popUpImage, openModal) {
  openModal(popUpImage);

  const cardImage = evt.target.closest(".card").querySelector(".card__image");
  const cardTitle = evt.target.closest(".card").querySelector(".card__title");

  popUpImg.src = cardImage.src;
  popUpImg.alt = cardImage.alt;
  popUpCaption.textContent = cardTitle.textContent;
}

function fillProfileForm(form) {
  form.elements.name.value = profileTitle.textContent;
  form.elements.description.value = profileDesc.textContent;
}

function fillAvatarForm(form) {
  let bgImage = profileImage.style.backgroundImage;
  form.elements.link.value = bgImage.slice(5, -2);
}

function isLoading(isLoading) {
  popUpButton.textContent = isLoading ? "Сохраняем..." : "Сохранить";
}

function updateProfileHead(data) {
  profileTitle.textContent = data.name;
  profileDesc.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
}

function getCards(cards, userId) {
  cards.forEach((cardItem) => {
    const newCard = createCard(
      cardItem,
      handleDelete,
      handleLike,
      handleOpenImage,
      popUpImage,
      openModal,
      userId
    );
    placeContainer.append(newCard);
  });
}

Promise.all([makeRequest("users/me"), makeRequest("cards")])
  .then(([userData, cardsData]) => {
    const userId = userData._id;
    updateProfileHead(userData);
    getCards(cardsData, userId);
  })
  .catch((err) => {
    console.error("Ошибка загрузки данных:", err);
  });

function addNewCard(endpoint, body) {
  isLoading(true);

  makeRequest(endpoint, "POST", body)
    .then((data) => {
      const newCard = createCard(
        data,
        handleDelete,
        handleLike,
        handleOpenImage,
        popUpImage,
        openModal,
        data.owner._id
      );
      placeContainer.prepend(newCard);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      isLoading(false);
    });
}

enableValidation(selectorList);
