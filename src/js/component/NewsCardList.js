export class NewsCardList {
  constructor(container, createCard, mainApi, page) {
    this.container = container;
    this.createCard = createCard;
    this.cardsArr = [];
    this.resultMoreButton = document.querySelector('.main__more');
    this.api = mainApi;
    this.page = page;
  };

  addCard = (data) => {
    this.container.appendChild(this.createCard(data, this.api, this.page).createCard());
  } 

  render(cards) {
    this.cardsArr = cards;
    const initArr = this.cardsArr.slice(0, 3);
    initArr.forEach(data => {
      this.addCard(data)
    });
  }

  renderSavedCards(cards) {
    cards.forEach(data => {
      this.addCard(data)
    });
  }

  renderMore() {
    let newArr = this.cardsArr.splice(4, 3); //возвращает массив из удалённых элементов
    newArr.forEach(data => {
      this.addCard(data)
    });
    if (this.cardsArr.length <= 4) {
      this.resultMoreButton.classList.add('hidden');
    }
  }
}