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
    authorization: "e406c5d0-c926-42e6-85c9-73e707970c80",
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

// Create a card element from the template
function getCardElement(data) {
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

  return cardElement; // Return the created card element
}

// Function to render a card
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item); // Don't pass cardTemplate anymore since it's a global variable
  cardsList[method](cardElement); // Append the card to the cards list
}

// Event handlers
function handleAvatarSubmit(evt) {
  evt.preventDefault(); // Prevent default form submission
  function makeRequest() {
    return api.editAvatarInfo(avatarInput.value).then((avatarData) => {
      profileImage.src = avatarData.avatar; // Update the profile image
      disableButton(avatarSubmitButton, settings); // Disable button if needed
      closeModal(avatarModal); // Close the modal after submission
    });
  }
  handleSubmit(makeRequest, evt); // Call handleSubmit
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
  evt.preventDefault(); // Prevent default form submission
  function makeRequest() {
    return api.editUserInfo({
      name: nameInput.value,
      about: descriptionInput.value,
    }).then((userData) => {
      profileName.textContent = userData.name; // Update profile name
      profileDescription.textContent = userData.about; // Update profile description
      closeModal(editProfileModal); // Close the modal after submission
    });
  }
  handleSubmit(makeRequest, evt); // Call handleSubmit
}

function handleAddCardSubmit(evt) {
  evt.preventDefault(); // Prevent default form submission
  function makeRequest() {
    return api.addCard({
      name: titleInput.value,
      link: imageInput.value,
    }).then((cardData) => {
      renderCard(cardData); // Don't pass cardTemplate
      disableButton(cardSubmitButton, settings); // Disable button if needed
      closeModal(cardModal); // Close the modal after submission
    });
  }
  handleSubmit(makeRequest, evt); // Call handleSubmit
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault(); // Prevent default form submission
  function makeRequest() {
    return api.deleteCard(selectedCardId).then(() => {
      selectedCard.remove(); // Remove the card from the DOM
      closeModal(deleteModal); // Close the delete modal
    });
  }
  handleSubmit(makeRequest, evt, "Deleting..."); // Call handleSubmit
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const closeButtons = document.querySelectorAll(".modal__close-btn");
  const cardTemplate = document.querySelector("#card-template")?.content; // Access template here
  const cardsList = document.querySelector(".cards__list");

  // Ensure the cardTemplate exists before proceeding
  if (!cardTemplate) {
    console.error("Error: Card template not found.");
    return; // Stop execution if template is not found
  }

  // Profile elements
  const profileImage = document.querySelector(".profile__avatar");
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  // Fetch user info and cards when the DOM is loaded
  api.getAppInfo().then(([cards, users]) => {
    if (cards.length === 0) {
      cardsList.innerHTML = "<p>No cards to display.</p>"; // Display message if no cards
    } else {
      cards.reverse();
      cards.forEach((card) => {
        renderCard(card); // Don't pass cardTemplate anymore
      });
    }

    // Set user profile info
    profileImage.src = users.avatar;
    profileName.textContent = users.name;
    profileDescription.textContent = users.about;
  }).catch(console.error);

  // Close button event listeners
  closeButtons.forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => closeModal(modal));
  });

  // Setup event listeners for modals and form submissions
  const avatarModalButton = document.querySelector(".profile__avatar-btn");
  const avatarModal = document.querySelector("#avatar-modal");
  const avatarModalForm = avatarModal.querySelector("#edit-avatar-form");
  avatarModalButton.addEventListener("click", () => openModal(avatarModal));
  avatarModalForm.addEventListener("submit", handleAvatarSubmit);

  const editProfileButton = document.querySelector(".profile__edit-btn");
  const editProfileModal = document.querySelector("#edit-modal");
  const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
  const nameInput = editProfileModal.querySelector("#profile-name-input");
  const descriptionInput = editProfileModal.querySelector("#profile-description-input");
  editProfileButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    resetValidation(editProfileForm, [nameInput, descriptionInput], settings);
    openModal(editProfileModal);
  });
  editProfileForm.addEventListener("submit", handleEditProfileSubmit);

  const cardModalButton = document.querySelector(".profile__add-btn");
  const cardModal = document.querySelector("#card-modal");
  const cardModalForm = cardModal.querySelector("#card-form");
  cardModalButton.addEventListener("click", () => openModal(cardModal));
  cardModalForm.addEventListener("submit", handleAddCardSubmit); // Ensure this function is defined

  const deleteModal = document.querySelector("#delete-modal");
  const deleteForm = deleteModal.querySelector(".modal__form");
  const deleteCancelButton = deleteModal.querySelector(".modal__submit-btn_type_cancel");
  deleteForm.addEventListener("submit", handleDeleteCardSubmit); // Ensure this function is defined
  deleteCancelButton.addEventListener("click", () => closeModal(deleteModal));

  // Enable form validation
  enableValidation(settings);
});
