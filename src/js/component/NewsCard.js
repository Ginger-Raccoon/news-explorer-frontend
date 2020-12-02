import { searchRequest, imageUrl } from '../constants/DOMelements'
import { editDataFormat } from '../utils/utils'
export class NewsCard {
  constructor(data, api, page) {
    this.data = data;
    this.api = api;
    this._saveCard = this._saveCard.bind(this);
    this._setListeners = this._setListeners.bind(this);
    this.cardID = null;
    // this._hoverIcon = this._hoverIcon.bind(this);
    // this._unHoverIcon = this._unHoverIcon.bind(this);
    // this._deleteCard = this._deleteCard.bind(this);
    this._cancelSaveCard = this._cancelSaveCard.bind(this);
    this.page = page
  };

  // urlToImage

  setListeners() {
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
  }

  createCard() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card', 'main__card');
    const cardPhotoContainer = document.createElement('div');
    cardPhotoContainer.classList.add('card__photo');
    const cardImg = document.createElement('img');
    cardImg.classList.add('card__img');
    const cardButtonContainer = document.createElement('div');
    
    const cardDate = document.createElement('span');
    cardDate.classList.add('card__date');
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card__title');
    const cardText = document.createElement('p');
    cardText.classList.add('card__text');
    const cardSource = document.createElement('span');
    cardSource.classList.add('card__source');
    
    cardContainer.appendChild(cardPhotoContainer);
    cardPhotoContainer.appendChild(cardImg);
    cardContainer.appendChild(cardButtonContainer);
    this.cardButtonContainer = cardButtonContainer;
    
    cardContainer.appendChild(cardDate);
    cardContainer.appendChild(cardTitle);
    cardContainer.appendChild(cardText);
    cardContainer.appendChild(cardSource);
    // console.log(this.data.date);
    
    cardTitle.textContent = this.data.title;
    
    cardText.textContent = this.data.description;
    cardSource.textContent = this.data.source.name;
    
    this.cardElement = cardContainer;
    // this._setListeners();
    if (this.page != 'favorit') {
      cardButtonContainer.classList.add('card__buttons');
      const buttonAuth = document.createElement('button');
      buttonAuth.classList.add('card__button', 'card__button_auth', 'button');
      const buttonSave = document.createElement('button');
      buttonSave.classList.add('card__button', 'card__button_save', 'card__button_save_unsaved', 'button');
      const image = this.data.urlToImage === null ? imageUrl : this.data.urlToImage;
      cardImg.setAttribute('src', image);

      
      cardButtonContainer.appendChild(buttonSave);
      
      this.cardElement.querySelector('.card__button_save').addEventListener('click', this._setListeners);

      cardDate.textContent = editDataFormat(this.data.publishedAt.slice(0, 10));
    } else {
      cardDate.textContent = this.data.date;

      const image = this.data.image;
      cardImg.setAttribute('src', image);

      cardButtonContainer.classList.add('card__buttons');
      const buttonCategory = document.createElement('button');
      buttonCategory.classList.add('card__button', 'card__button_category');
      buttonCategory.textContent = this.data.keyword;
      const buttonDelete = document.createElement('button');
      buttonDelete.classList.add('card__button', 'card__button_delete');

      this.cardButtonContainer.appendChild(buttonCategory);
      this.cardButtonContainer.appendChild(buttonDelete);
      this.cardElement.querySelector('.card__button_delete').addEventListener('click', () => {
        this.api.removeCard(this.data._id)
          .then((res) => {
            window.location.reload();
          })
          .catch(err => console.log(err));
      });
    }
    return cardContainer; 
  }

  _saveCard() {
    this.api.getUser()
      .then((res) => {
        if (res != undefined) {
          this.cardElement.querySelector('.card__button_save').classList.remove('card__button_save_unsaved');
          this.cardElement.querySelector('.card__button_save').classList.add('card__button_save_saved');
          // this.cardElement.querySelector('.card__button_save').addEventListener('click', () => this._setListeners());
          const cardData = {
            keyword: searchRequest.value,
            title: this.data.title,
            text: this.data.description,
            date: editDataFormat(this.data.publishedAt.slice(0, 10)),
            source: this.data.source.name,
            link: this.data.url,
            image: this.data.urlToImage
          };
          this.api.postCard(cardData)
            .then((res) => {
              this.cardID = res.data._id;
            })
            .catch(err => console.log(err));
        } else {
          if(document.getElementsByClassName('card__button_auth').length === 0) {
            const buttonAuth = document.createElement('button');
            buttonAuth.classList.add('card__button', 'card__button_auth', 'button');
            this.cardButtonContainer.appendChild(buttonAuth);
            buttonAuth.textContent = 'Войдите, чтобы сохранять статьи';
          }
          
          // this._removeListeners();   
        }
      })
      .catch(err => console.log(err));
  }

  _cancelSaveCard() {
    // this._setListeners();
    console.log('canselSave')
    // this.cardElement.querySelector('.card__button_save').addEventListener('click', () => this._setListeners());
    this.api.removeCard(this.cardID)
      .then(() => {
        this.cardElement.querySelector('.card__button_save').classList.remove('card__button_save_saved');
        this.cardElement.querySelector('.card__button_save').classList.add('card__button_save_unsaved');
        
        // 
        // const cardIcon =  
        // cardIcon
        // cardIcon.addEventListener('mouseover', this._hoverIcon);
        // cardIcon.addEventListener('mouseout', this._unHoverIcon);
      }
      )
      .catch(err => alert(err));
  }

  // _deleteCard() {
  //   this._removeListeners();
  //   const cardID = this.cardElement.querySelector('.card').dataset.id;
  //   console.log(this.cardElement.closest('.main__cards').remove());
  //   this.cardElement.closest('.main__cards').remove();
  //   this.api.removeCard(cardID)
  //     .then(() => { window.location.reload(); })
  //     .catch(err => alert(err));
  // }

  _setListeners() {
    // this._removeListeners();
    // this.cardElement.querySelector('.card__button_save').classList.remove('card__button_save_saved')
    if(this.cardElement.querySelector('.card__button_save').classList.contains('card__button_save_unsaved')) {
      
      // this.removeEventListener('click', this._cancelSaveCard());
      this.cardElement.querySelector('.card__button_save').addEventListener('click', this._saveCard());
    } else {
      // this.cardElement.querySelector('.card__button_save').removeEventListener('click', this._saveCard());
      this.cardElement.querySelector('.card__button_save').addEventListener('click', this._cancelSaveCard());
    }
  }

  _removeListeners() {
    console.log('removeListeners');
    const cardButton = this.cardElement.querySelector('.card__button_save');
    // articleIcon.removeEventListener('mouseover', this._hoverIcon);
    // articleIcon.removeEventListener('mouseout', this._unHoverIcon);
    cardButton.removeEventListener('click', this._saveCard());
    cardButton.removeEventListener('click', this._cancelSaveCard());
    this._setListeners();
  }

}