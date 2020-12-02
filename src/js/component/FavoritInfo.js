import { userName, cardsQuantity, searchCategory, titleEnding, quantityKeywords, othersKeywords, firstKeyword, secondKeyword, thirdKeyword, connectorKeywords } from '../constants/DOMelements';

export class FavoritInfo {
  constructor(api) {
    this.api = api;
    this.savedCardsArr = [];
  };

  render(cardsArr) {
    this.savedCardsArr = cardsArr;
    this._setUserName();
    this._setArticleAmount();
    this._setTags();
  }

  _setUserName() {
    this.api.getUser()
      .then((res) => {
        userName.textContent = res.name;
      })
      .catch(err => console.log(err));
  }
 // переделать на любые числа, нужно взять массив развернуть его и взять первый символ
  _setArticleAmount() {
    const articleAmount = this.savedCardsArr.length;
    function forArticleEnding(num) {
      return num.toFixed(0).split('').reverse().join('');
    }
    const reverseArticleAmount = forArticleEnding(articleAmount);
    this.reverseArticleAmount = reverseArticleAmount;
    console.log(reverseArticleAmount[0])
    if (articleAmount <= 0) {
      cardsQuantity.textContent = 0;
      searchCategory.classList.add('hidden');
    } cardsQuantity.textContent = articleAmount;
    if (reverseArticleAmount[0] == 1) {
      titleEnding.textContent = 'сохранённая статья';
    } else if (reverseArticleAmount[0] >= 2 && reverseArticleAmount[0] <= 4) {
      titleEnding.textContent = 'сохранённые статьи';
    } else {
      titleEnding.textContent = 'сохранённых статей';
    }
  }

  _setTags() {
    const keywordsArr = [];
    // создаём массив ключевых слов, выдранных из объекта со статьями
    this.savedCardsArr.forEach(article => {
      keywordsArr.push(article.keyword);
    });
    // console.log(keywordsArr);
    // создадим объект, содержащий ключевое слово и количество повторений
    const keywordsObj = keywordsArr.reduce(function (prevVal, item) { // item = ключевое слово
      
      if (!prevVal[item]) {
        // если ключевого слова ещё нет в объекте, значит это его первое повторение, в даннном случае ключевое слово - свойство объекта
        prevVal[item] = 1;
      } else {
        // иначе увеличим количество повторений на 1
        prevVal[item] += 1;
      }
      // и вернём изменённый объект
      return prevVal;
    }, {}); // Начальное значение — пустой объект.
    // выберем из объекта только количество повторений, сохраним в массив
    const valuesArr = Object.values(keywordsObj);
    // посчитаем количество тегов
    const allTagAmount = valuesArr.length;
    // отсортируем массив с количеством повторений по убыванию
    const sortedValuesArr = valuesArr.sort(function(a, b) {
      return b - a;
    });
    // получим значения максимального количества повторений
    const firstValue = sortedValuesArr[0];
    const secondtValue = sortedValuesArr[1];
    const thirdValue = sortedValuesArr[2];
    // функция возвращающая свойство объекта по его значению
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }
    const firstTag = getKeyByValue(keywordsObj, firstValue);
    // удалим из объекта первый тег для избежания повторения при равных значениях, нотация для ключа-переменной скобочная
    delete keywordsObj[firstTag];
    console.log(firstTag);
    const secondTag = getKeyByValue(keywordsObj, secondtValue);
    // // удалим второй тег
    delete keywordsObj[secondTag];
    const thirdTag = getKeyByValue(keywordsObj, thirdValue);
    // получим количество других тегов
    const anoverTagAmount = allTagAmount - 2;
    // опишем логику вставки контента для разного количества тегов
    if (allTagAmount === 3) {
      quantityKeywords.textContent = thirdTag;
      othersKeywords.classList.add('hidden');
    } else if (allTagAmount === 2) {
      secondKeyword.textContent = secondTag;
      quantityKeywords.classList.add('hidden');
      connectorKeywords.classList.add('hidden');
      othersKeywords.classList.add('hidden');
    } else if (allTagAmount === 1) {
      secondKeyword.textContent = '';
      quantityKeywords.classList.add('hidden');
      connectorKeywords.classList.add('hidden');
      othersKeywords.classList.add('hidden');
    } else { quantityKeywords.textContent = anoverTagAmount; }
    firstKeyword.textContent = firstTag;
    secondKeyword.textContent = secondTag;
    // поработаем с падежами при разном количестве других тегов
    if (this.reverseArticleAmount[0] === 1) {
      othersKeywords.textContent = 'другому';
    } else {
      othersKeywords.textContent = 'другим';
    }
  }
}