export class FormValidator {
  constructor(formName) {
    this.formName = formName;
  }

  setEventListeners = () => {
    Array.from(this.formName).forEach((inputElement) => {
      if (inputElement.type !== 'submit' && inputElement.tagName !== 'button') {
        inputElement.addEventListener('input', this._handleValidate, true)
      }
    });
  }

  _handleValidate = (event) => {
    const submit = event.target.form.querySelector('.popup__button');
    const [...inputs] = event.target.form.elements;
    this._errorHandler(event.target);
    if (inputs.every(this._checkInputValid)) {
      this._setSubmitButtonState(submit, true);
    } else {
      this._setSubmitButtonState(submit, false);
    }
  }

  _setSubmitButtonState(formButton, validState) {
    if (validState) {
      formButton.removeAttribute('disabled');
      formButton.classList.remove('popup__button_disabled');
    } else {
      formButton.setAttribute('disabled', true);
      formButton.classList.add('popup__button_disabled');
    }
  }

  _errorHandler = (inputElement) => {
    const errorElement = document.querySelector(`#error-${inputElement.id}`);
    const valid = this._checkInputValid(inputElement);
    errorElement.textContent = inputElement.validationMessage;
    return valid;
  }

  _checkInputValid = (inputElement) => {
    inputElement.setCustomValidity('');
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity('Это обязательное поле');
      return false;
    }
    if (inputElement.validity.typeMismatch && inputElement.type === 'email') {
      inputElement.setCustomValidity('Неправильный формат email');
      return false;
    }

    return inputElement.checkValidity();
  }

  checkFormValid = () => {
    const inputs = [...this.formName.elements];
    let valid = true;
    inputs.forEach((inputElement) => {
      if (inputElement.type !== 'submit' && inputElement.tagName !== 'button') {
        if (!this._errorHandler(inputElement)) valid = false;
      }
    });

    return valid;
  }

}