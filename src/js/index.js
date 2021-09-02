'use strict'
import '../styles/index.css';
import { popupReg, popupSuccess, popupAuth, buttonOpenAuth, buttonReg, openAuthReg, openAuthSuccess, searchForm, searchRequest, cardsContainer, buttonOpenMenu, buttonMore} from './constants/DOMelements';
import { newsServerConfig, myServerConfig } from './constants/config';
//popup's
import { PopupAuth } from './component/PopupAuth';
import { PopupRegister } from './component/PopupRegister';
import { PopupSuccess } from './component/PopupSuccess';
import { FormValidator } from './component/FormValidator';

import { Header } from './component/Header';
//api
import { NewsApi } from './api/NewsApi';
import { MainApi } from './api/MainApi';
//card's
import { NewsCard } from './component/NewsCard';
import { NewsCardList } from './component/NewsCardList';
import { Result } from './component/Result';





(function () {
const mainApi = new MainApi(myServerConfig);
const newsApi = new NewsApi(newsServerConfig);
const header = new Header(mainApi);
const formValidator = (...arg) => new FormValidator(...arg);
const successPopup = new PopupSuccess(popupSuccess);
const regPopup = new PopupRegister(popupReg, mainApi, successPopup, formValidator);
const authPopup = new PopupAuth(popupAuth, mainApi, header, formValidator);
const createCard = (...arg) => new NewsCard(...arg);
const cardList = new NewsCardList(cardsContainer, createCard, mainApi);
const searchResult = new Result(newsApi, cardList);

buttonOpenAuth.addEventListener('click', () => {
  authPopup.open();
})
buttonReg.addEventListener('click', () => {
  authPopup.close();
  regPopup.open();
});

openAuthReg.addEventListener('click', () => {
  regPopup.close();
  authPopup.open();
});

openAuthSuccess.addEventListener('click', () =>  {
  successPopup.close();
  authPopup.open();
});

document.querySelector('.menu__button_exit').addEventListener('click', () => {
  mainApi.unlogin()
  .then(() => {
    header.render();
  })
  .catch((err) => console.log(err))
})

searchForm.addEventListener('submit', () => searchResult.searchNews(searchRequest.value));

buttonMore.addEventListener('click', () => cardList.renderMore());

buttonOpenMenu.addEventListener('click', () => header.openMenu());
header.render();
  
}());