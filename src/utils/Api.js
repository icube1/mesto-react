import {apiInfo} from './variables.js'

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then((response) => this._handleResponse(response));
  }

  setAvatar(data) {
    return  fetch(`${this._baseUrl}cards`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
  }).then((response) => this._handleResponse(response));}

  updateProfile(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then((response) => this._handleResponse(response));
    }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then((response) => this._handleResponse(response));
  }
  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    })
    .then((response) => this._handleResponse(response));
  }
  getData() {
    return Promise.all([ this.getProfile(), this.getInitialCards() ])
  }

  addLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((response) => this._handleResponse(response));
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((response) => this._handleResponse(response));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((response) => this._handleResponse(response));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
       })
    })
    .then((response) => this._handleResponse(response));
  }
}
const api = new Api({
  baseUrl: apiInfo.url,
  headers: {
    authorization: apiInfo.token,
    'Content-Type': 'application/json'
  }});

export {api}
