import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import { handleSubmit } from "../utils/helpers";
import Api from "../utils/Api.js";

let selectedCard, selectedCardId;

// API setup
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b3ddf623-2d0f-4e5a-a7b9-d7f30d2fad6e",
    "Content-Type": "application/json",
  },
});

// Functions to handle modals
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
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalEsc);
    modal.removeEventListener("mousedown", closeModalOverlay);
  }
}

// Function to render a card
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement); // Use prepend to add new cards at the top
}

// Create a card element from the template
function getCardElement(data) {
  // Check if cardTemplate exists
  if (!cardTemplate) {
    console.error("Error: cardTemplate is not defined or not found.");
    return;
  }

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-btn_liked");
  }

  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data._id));
  cardDeleteButton.addEventListener("click", () => handleDeleteCard(cardElement, data._id));
  cardImageElement.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

// Event handlers
function handleAvatarSubmit(evt) {
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

  api.changeLikeStatus(id, isLiked).then(() => {
    cardLikeButton.classList.toggle("card__like-btn_liked", !isLiked);
  }).catch(console.error);
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
  function makeRequest() {
    return api.editUserInfo({
      name: nameInput.value,
      about: descriptionInput.value,
    }).then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editProfileModal);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleAddCardSubmit(evt) {
  function makeRequest() {
    return api.addCard({
      name: titleInput.value,
      link: imageInput.value,
    }).then((cardData) => {
      renderCard(cardData);
      disableButton(cardSubmitButton, settings);
      closeModal(cardModal);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleDeleteCardSubmit(evt) {
  function makeRequest() {
    return api.deleteCard(selectedCardId).then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    });
  }
  handleSubmit(makeRequest, evt, "Deleting...");
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
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
  const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
  const nameInput = editProfileModal.querySelector("#profile-name-input");
  const descriptionInput = editProfileModal.querySelector("#profile-description-input");
  const cardModal = document.querySelector("#card-modal");
  const cardModalForm = cardModal.querySelector("#card-form");
  const cardSubmitButton = cardModal.querySelector(".modal__submit-btn");
  const imageInput = cardModal.querySelector("#card-link-input");
  const titleInput = cardModal.querySelector("#card-caption-input");

  // Avatar form elements
  const avatarModal = document.querySelector("#avatar-modal");
  const avatarModalForm = avatarModal.querySelector("#edit-avatar-form");
  const avatarInput = avatarModal.querySelector("#profile-avatar-input");
  const avatarSubmitButton = avatarModal.querySelector(".modal__submit-btn");

  // Delete form elements
  const deleteModal = document.querySelector("#delete-modal");
  const deleteForm = deleteModal.querySelector(".modal__form");
  const deleteCancelButton = deleteModal.querySelector(".modal__submit-btn_type_cancel");

  // Card-related elements
  const cardTemplate = document.querySelector("#card-template")?.content; // Template for cards
  const cardsList = document.querySelector(".cards__list");

  // Log the card template to see if it's being selected properly
  console.log('Card template:', cardTemplate);

  // Check if cardTemplate is being selected properly
  if (!cardTemplate) {
    console.error("Error: Card template not found.");
    return;  // Stop the execution if cardTemplate is null or undefined
  }

  // Preview image popup elements
  const previewModal = document.querySelector("#preview-modal");
  const previewModalImageElement = document.querySelector(".modal__image");
  const previewModalCaptionElement = document.querySelector(".modal__caption");

  // Fetch user info and cards when the DOM is loaded
  api
    .getAppInfo()
    .then(([cards, users]) => {
      if (cards.length === 0) {
        console.log("No cards available");
        cardsList.innerHTML = "<p>No cards to display.</p>";  // Display message if no cards
      } else {
        cards.reverse();
        cards.forEach((card) => {
          renderCard(card);
        });
      }

      profileImage.src = users.avatar;
      profileName.textContent = users.name;
      profileDescription.textContent = users.about;
    })
    .catch(console.error);

  // Close button event listeners
  closeButtons.forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => closeModal(modal));
  });

  if (avatarModalButton) {
    avatarModalButton.addEventListener("click", () => openModal(avatarModal));
  }

  if (avatarModalForm) {
    avatarModalForm.addEventListener("submit", handleAvatarSubmit);
  }

  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      nameInput.value = profileName.textContent;
      descriptionInput.value = profileDescription.textContent;
      resetValidation(editProfileForm, [nameInput, descriptionInput], settings);
      openModal(editProfileModal);
    });
  }

  if (editProfileForm) {
    editProfileForm.addEventListener("submit", handleEditProfileSubmit);
  }

  if (cardModalButton) {
    cardModalButton.addEventListener("click", () => openModal(cardModal));
  }

  if (cardModalForm) {
    cardModalForm.addEventListener("submit", handleAddCardSubmit);
  }

  if (deleteForm) {
    deleteForm.addEventListener("submit", handleDeleteCardSubmit);
  }

  if (deleteCancelButton) {
    deleteCancelButton.addEventListener("click", () => closeModal(deleteModal));
  }

  // Enable form validation
  enableValidation(settings);
});
