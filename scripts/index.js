// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placeContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closeButton = popupNewCard.querySelector('.popup__close');
const cardList = initialCards

const addCard = (name, link) => {
    const cardTemplate = document.querySelector(`#card-template`).content;
    const cardElement = cardTemplate.querySelector(`.places__item`).cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = 'Фото карточки с названием ' + name;
    cardElement.querySelector('.card__title').innerText = name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        cardElement.remove();
    })

    cardElement.querySelector('.card__like-button').addEventListener('click', (e) => {
        e.target.classList.toggle('card__like-button_is-active');
    })

    placeContainer.append(cardElement);
}

cardList.forEach(card => {
    const cardName = card.name;
    const cardLink = card.link;

    addCard(cardName, cardLink);
})

addButton.addEventListener('click', () => {
    popupNewCard.classList.add('popup_is-opened');
});

saveButton.addEventListener('click', () => {

    const cardName = document.querySelector(".popup__input_type_card-name").value;
    const cardLink = document.querySelector(".popup__input_type_url").value;

    addCard(cardName, cardLink);

    popupNewCard.classList.toggle('popup_is-opened');

    document.querySelector(".popup__input_type_card-name").value = '';
    document.querySelector(".popup__input_type_url").value = '';
});

closeButton.addEventListener('click', () => {
    popupNewCard.classList.remove('popup_is-opened');
});


