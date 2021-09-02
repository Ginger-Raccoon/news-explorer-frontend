export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add('popup_isOpen');
    this._setListeners();
    document.querySelector('.body').append(this.popup);
    document.querySelector('.body').classList.add('body_OvHidden');
  }

  clearForm() {
    this.popup.querySelectorAll('.popup__error-message').forEach((inputElement) => {
      inputElement.textContent = '';
    });
    this.popup.querySelectorAll('.popup__input').forEach((inputElement) => {
      inputElement.value = '';
    });
    this.popup.querySelectorAll('.popup__request-error').forEach((inputElement) => {
      inputElement.textContent = '';
    })
  }

  close() {
    this.popup.closest('.popup').classList.remove('popup_isOpen');
    document.querySelector('.body').classList.remove('body_OvHidden');
  }

  _setListeners() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

}