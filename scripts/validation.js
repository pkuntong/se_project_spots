const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_inactive",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error",
  };
  
  const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(config.inputErrorClass);
  };
  
  const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config
      );
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const disableButton = (buttonElement, config) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  };
  
  const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, config);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };
  
  const resetValidation = (formElement, inputList, config) => {
    inputList.forEach((input) => {
      hideInputError(formElement, input, config);
    });
  };
  
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    console.log(inputList);
    console.log(buttonElement);
  
    toggleButtonState(inputList, buttonElement, config);
    formElement.addEventListener("reset", () => {
        disableButton(buttonElement, config);
       });
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };
  
  const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    });
  };
  
  enableValidation(settings);