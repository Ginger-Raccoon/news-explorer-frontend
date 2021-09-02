import Popup from './Popup';
class PopupRegister extends Popup {
  constructor(popup, api, popupConfirm, formValidator) {
    super(popup);
    this.userMail = document.querySelector('#reg-email');
    this.userName = document.querySelector('#reg-name');
    this.userPassword = document.querySelector('#reg-password');
    this.form = this.popup.querySelector('.popup__form');
    this.api = api;
    this.popupConfirm = popupConfirm;
    this.formValidator = formValidator;
  }

  open = () => {
    super.open();
    super.clearForm();
    this._setSubmitListeners();
    this.formValidator(this.form).setEventListeners();
  }

  _register = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: this.userName.value,
      email: this.userMail.value,
      password: this.userPassword.value,
    };
    this.formValidator(this.form).checkFormValid();
    this.api.signUp(newUserInfo)
      .then((res) => {
        localStorage.setItem('token', res.token);
        super.close();
        this.popupConfirm.open();
      })
      .catch((err) => {
        this.popup.querySelector('.popup__request-error').textContent = err.message;
      })
  }

  _setSubmitListeners() { 
    this.form.addEventListener('submit', this._register);
  }

}

export { PopupRegister };