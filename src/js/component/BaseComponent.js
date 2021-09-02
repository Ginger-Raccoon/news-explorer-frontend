export default class BaseComponent {
  constructor() {
  }

  //обработка запроса на установку слушателей
  _setHandlers = (arrayParams) => {
    arrayParams.forEach((params) => {
      this._addHandler(...params);
    });
  }

  //установка слушателей
  _addHandler = (element, event, handler) => {
    element.addEventListener(event, handler);
  };

  //обработка запроса на удаление слушателей
  _removeHandlers = (arrayParams) => {
    arrayParams.forEach((params) => {
      this._removeHandler(...params);
    });
  };

  //удаление слушателей
  _removeHandler = (element, event, handler) => {
    element.removeEventListener(event, handler);
  };
}