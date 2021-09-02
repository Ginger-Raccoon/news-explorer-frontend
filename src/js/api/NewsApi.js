export class NewsApi {
  constructor(server) {
    this.server = server;
  }

  getArticles(keyword) {
    const today = new Date();
    const weekInMS = 604800000;
    const lastweek = new Date(today.getTime() - weekInMS);
    const startDate = lastweek.toISOString().slice(0, 10);
    const finalDate = today.toISOString().slice(0, 10);
    return fetch(`${this.server}v2/everything?q=${keyword}&from=${startDate}&to=${finalDate}&apiKey=ff696571d7474409aa3a58ef768984d9&pageSize=100`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }

}