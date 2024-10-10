import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { handleSubmit } from "../utils/helpers";

let selectedCard, selectedCardId;

// API setup
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7a1857b8-0326-43ef-b325-d3424afa2503",
    "Content-Type": "application/json",
  },
});

// Fetch user info and cards when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  api
    .getAppInfo()
    .then(([cards, users]) => {
      cards.reverse();
      cards.forEach((card) => {
        renderCard(card);
      });

      profileImage.src = users.avatar;
      profileName.textContent = users.name;
      profileDescription.textContent = users.about;
    })
    .catch(console.error);

  // Universal elements
  const closeButtons = document.querySelectorAll(".modal__close-btn");

  // Profile elements
  const editProfileButton = document.querySelector(".profile__edit-btn");
  const profileImage = document.querySelector(".profile__avatar");
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");
  const cardModalButton = document.querySelector(".profile__add-btn");
  const avatarModalButton = document.querySelector(".profile__avatar-btn");

  // Card form elements
  const editProfileModal = document.querySelector("#edit-modal");
  const editProfileForm = editProfileModal?.querySelector("#edit-profile-form");
  const nameInput = editProfileModal?.querySelector("#profile-name-input");
  const descriptionInput = editProfileModal?.querySelector(
    "#profile-description-input"
  );
  const cardModal = document.querySelector("#card-modal");
  const cardModalForm = cardModal?.querySelector("#card-form");
  const cardSubmitButton = cardModal?.querySelector(".modal__submit-btn");
  const imageInput = cardModal?.querySelector("#card-link-input");
  const titleInput = cardModal?.querySelector("#card-caption-input");

  // Avatar form elements
  const avatarModal = document.querySelector("#avatar-modal");
  const avatarModalForm = avatarModal?.querySelector("#edit-avatar-form");
  const avatarInput = avatarModal?.querySelector("#profile-avatar-input");
  const avatarSubmitButton = avatarModal?.querySelector(".modal__submit-btn");

  // Delete form elements
  const deleteModal = document.querySelector("#delete-modal");
  const deleteForm = deleteModal?.querySelector(".modal__form");
  const deleteCancelButton = deleteModal?.querySelector(
    ".modal__submit-btn_type_cancel"
  );

  // Card-related elements
  const cardTemplate = document.querySelector("#card-template").content;
  const cardsList = document.querySelector(".cards__list");

  // Preview image popup elements
  const previewModal = document.querySelector("#preview-modal");
  const previewModalImageElement = previewModal?.querySelector(".modal__image");
  const previewModalCaptionElement = previewModal?.querySelector(
    ".modal__caption"
  );

  // Event listeners for close buttons
  closeButtons.forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => closeModal(modal));
  });

  // Open avatar modal
  avatarModalButton?.addEventListener("click", () => {
    openModal(avatarModal);
  });

  // Handle avatar submit
  avatarModalForm?.addEventListener("submit", handleAvatarSubmit);

  // Open edit profile modal
  editProfileButton?.addEventListener("click", () => {
    if (nameInput && profileName && descriptionInput && profileDescription) {
      nameInput.value = profileName.textContent;
      descriptionInput.value = profileDescription.textContent;
      resetValidation(editProfileForm, [nameInput, descriptionInput], settings);
      openModal(editProfileModal);
    }
  });

  // Handle profile form submit
  editProfileForm?.addEventListener("submit", handleEditProfileSubmit);

  // Open add card modal
  cardModalButton?.addEventListener("click", () => {
    openModal(cardModal);
  });

  // Handle add card submit
  cardModalForm?.addEventListener("submit", handleAddCardSubmit);

  // Handle delete card submit
  deleteForm?.addEventListener("submit", handleDeleteCardSubmit);

  // Handle delete cancel button
  deleteCancelButton?.addEventListener("click", () => {
    closeModal(deleteModal);
  });

  // Enable form validation
  enableValidation(settings);
});

// Functions
function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

function openModal(modal) {
  if (modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", closeModalEsc);
    modal.addEventListener("mousedown", closeModalOverlay);
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalEsc);
    modal.removeEventListener("mousedown", closeModalOverlay);
  }
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardBinButton = cardElement.querySelector(".card__bin-btn");

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-btn_liked");
  }

  cardImageElement.src = data.link;
  cardImageElement.alt = data.alt;
  cardNameElement.textContent = data.name;

  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data._id));
  cardBinButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );
  cardImageElement.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  function makeRequest() {
    return api.editAvatarInfo(avatarInput.value).then((avatarData) => {
      profileImage.src = avatarData.avatar;
      disableButton(avatarSubmitButton, settings);
      closeModal(avatarModal);
    });
  }

  handleSubmit(makeRequest, evt);
}

function handleLike(evt, id) {
  const cardLikeButton = evt.target;
  const isLiked = cardLikeButton.classList.contains("card__like-btn_liked");

  api
    .changeLikeStatus(id, isLiked)
    .then((isLiked) => {
      cardLikeButton.classList.toggle("card__like-btn_liked", !isLiked);
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleImageClick(data) {
  previewModalImageElement.src = data.link;
  previewModalImageElement.alt = data.name;
  previewModalCaptionElement.textContent = data.name;
  openModal(previewModal);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  function makeRequest() {
    return api
      .editUserInfo({
        name: nameInput.value,
        about: descriptionInput.value,
      })
      .then((userData) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(editProfileModal);
      });
  }

  handleSubmit(makeRequest, evt);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  function makeRequest() {
    return api
      .addCard({ name: titleInput.value, link: imageInput.value })
      .then((cardData) => {
        renderCard(cardData);
        disableButton(cardSubmitButton, settings);
        closeModal(cardModal);
      });
  }

  handleSubmit(makeRequest, evt);
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();
  function makeRequest() {
    return api.deleteCard(selectedCardId).then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    });
  }

  handleSubmit(makeRequest, evt, "Deleting...");
}
