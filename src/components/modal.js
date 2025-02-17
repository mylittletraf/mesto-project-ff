export function openModal(popup) {
  if (popup) {
    popup.classList.add("popup_is-animated");
    setTimeout(() => {
      popup.classList.add("popup_is-opened");
    }, 10);
    document.addEventListener("keydown", handleEscClose);
  }
}

export function closeModal(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    setTimeout(() => {
      popup.classList.remove("popup_is-animated");
    }, 600);
    document.removeEventListener("keydown", handleEscClose);
  }
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
