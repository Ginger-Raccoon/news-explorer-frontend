export class MainApi {
  constructor(server) {
    this.server = server;
  }

  signUp = (newUserInfo) => {
    return fetch(`${this.server}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: newUserInfo.email,
        password: newUserInfo.password,
        name: newUserInfo.name
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => { throw err; })
  }

  signIn = (loginData) => {
    return fetch(`${this.server}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => { throw err; })
  }

  unlogin = () => {
    return fetch(`${this.server}exit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: '',
        password: '',
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => { throw err; })
  }

  getUser() {
    return fetch(`${this.server}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      const json = res.json();
      return json.then(Promise.reject.bind(Promise))
    })
      .catch((err) => { return undefined } )
  }
  
  postCard = (cardData) => {
    return fetch(`${this.server}articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: cardData.keyword,
        title: cardData.title,
        text: cardData.text,
        date: cardData.date,
        source: cardData.source,
        link: cardData.link,
        image: cardData.image
      }),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      const json = res.json();
      return json.then(Promise.reject.bind(Promise))
    })
      .catch((err) => { throw err; })
  }

  getInitialCards() {
    return fetch(`${this.server}articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      const json = res.json();
      return json.then(Promise.reject.bind(Promise))
    })
      .catch((err) => { throw err; })
  }


  removeCard = (cardID) => {
    return fetch(`${this.server}articles/${cardID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      const json = res.json();
      return json.then(Promise.reject.bind(Promise))
    })
      .catch((err) => { throw err; })
  }

}