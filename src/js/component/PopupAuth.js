import Popup from './Popup';
export class PopupAuth extends Popup {
  constructor(popup, api, header, formValidator) {
    super(popup);
    this.form = this.popup.querySelector('.popup__form');
    this.mail = this.form.querySelector('#auth-email');
    this.password = this.form.querySelector('#auth-password');
    this.api = api;
    this.header = header;
    this.formValidator = formValidator;
  }

  open = () => {
    super.open();
    super.clearForm();
    this._setSubmitListeners();
    this.formValidator(this.form).setEventListeners();
  }

  _login = (event) => {
    event.preventDefault();
    const data = {
      email: this.mail.value,
      password: this.password.value,
    };
    this.formValidator(this.form).checkFormValid();
    this.api.signIn(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        console.log('авторизация прошла успешно');
        
        this.header.render();
        super.close();
      })
      .catch((err) => {
        this.popup.querySelector('.popup__request-error').textContent = err.message;
      })
  }

  _setSubmitListeners() {
    this.form.addEventListener('submit', this._login);
  }

}