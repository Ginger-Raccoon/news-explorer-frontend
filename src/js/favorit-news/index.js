'use strict'

import '../../styles/favorit.css';
import { newsServerConfig, myServerConfig } from '../constants/config';
import { Header } from '../component/Header';
import { MainApi } from '../api/MainApi';
import { NewsCard } from '../component/NewsCard';
import { NewsCardList } from '../component/NewsCardList';
import { cardsContainer, buttonOpenMenu } from '../constants/DOMelements';
import { FavoritInfo } from '../component/FavoritInfo';

(function () {
  const page = 'favorit';
  const mainApi = new MainApi(myServerConfig);
  const header = new Header(mainApi); 
  const createCard = (...args) => new NewsCard(...args);
  const cardList = new NewsCardList(cardsContainer, createCard, mainApi, page);
  const favoritInfo = new FavoritInfo(mainApi);

  if (localStorage.getItem('token') === null) {
    window.location.href = 'http://localhost:8080';
  }

  mainApi.getInitialCards()
  .then((res) => {
    const savedCardsArr = res.data;
    cardList.renderSavedCards(savedCardsArr);
    favoritInfo.render(savedCardsArr);
  })
  .catch(err => console.log(err));


  buttonOpenMenu.addEventListener('click', () => header.openMenu());
  header.render();  

}());