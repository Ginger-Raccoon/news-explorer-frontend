import { mainSection, mainTitle, containerResult, buttonMore, empty, emptyNotFound, emptyError, emptyLoader, emptyLoading } from '../constants/DOMelements'
export class Result {
  constructor(api, cardList) {
    this.api = api;
    this.cardList = cardList;
  };

  searchNews(keyword) {
    event.preventDefault();
    while (containerResult.firstChild) {
      containerResult.removeChild(containerResult.firstChild);
    };
      empty.classList.remove('hidden');
      emptyLoader.classList.remove('hidden');
      emptyLoading.classList.remove('hidden');

    this.api.getArticles(keyword)
      .then((res) => {
        if (res.articles.length === 0) {
          emptyLoader.classList.add('hidden');
          emptyLoading.classList.add('hidden');
          emptyNotFound.classList.remove('hidden');
        }
        else {
          this.cardList.render(res.articles);
          if (res.articles.length <= 3) {
            buttonMore.classList.add('hidden');
          } else buttonMore.classList.remove('hidden');
        }
      })
      .then(() => {
        mainSection.classList.remove('hidden');
        empty.classList.add('hidden');
      })
      .catch(() => {
        empty.classList.remove('hidden');
        emptyLoader.classList.add('hidden');
        emptyLoading.classList.add('hidden');
        emptyError.classList.remove('hidden');
      })
  }
}