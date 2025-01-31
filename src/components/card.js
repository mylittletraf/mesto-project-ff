export const handleDelete = (cardElement) => {
    cardElement.remove();
};

export const handleLike = (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
};

export const handleOpenImage = (evt, popUpImage, openModal) => {
    openModal(popUpImage);

    const cardImage = evt.target.closest('.card').querySelector('.card__image');
    const cardTitle = evt.target.closest('.card').querySelector('.card__title');

    popUpImage.querySelector(".popup__image").src = cardImage.src;
    popUpImage.querySelector(".popup__caption").textContent = cardTitle.textContent;
};

export const createCard = (item, handleDelete, handleLike, handleOpenImage, popUpImage, openModal) => {
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
        .addEventListener("click", () => handleDelete(cardElement));

    cardElement
        .querySelector(".card__like-button")
        .addEventListener("click", handleLike);

    cardImage.addEventListener("click", (evt) => handleOpenImage(evt, popUpImage, openModal));

    return cardElement;
};