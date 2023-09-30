class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  //проверка ответа
  _checkRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //загрузка карточек с сервера
  getCardInfo() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
    })
      .then(res => this._checkRes(res))
  }

  //загрузка пользователя
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
    })
      .then(res => this._checkRes(res))
  }

  //обновление инфмормации о пользователе
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._checkRes(res))
  }

  //обновление аватара пользователя
  updateUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._checkRes(res))
  }

  //лайк карточки
  _addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
    })
      .then(res => this._checkRes(res))
  }

  //снятие лайка
  _deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => this._checkRes(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLike(cardId)
    } else {
      return this._addLike(cardId)
    }
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._checkRes(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => this._checkRes(res))
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000'
});

export default api;
