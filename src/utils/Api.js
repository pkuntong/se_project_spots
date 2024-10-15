class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  _request(endpoint, options = {}) {
    const finalOptions = {
      headers: this._headers,  
      ...options,  
    };

    const url = `${this._baseUrl}${endpoint}`;  
    return fetch(url, finalOptions).then(this._checkResponse);  
  }

  getInitialCards() {
    return this._request('/cards');
  }

  getUserInfo() {
    return this._request('/users/me');
  }

  editUserInfo({ name, about }) {
    return this._request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    });
  }

  editAvatarInfo(avatar) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    });
  }

  addCard({ name, link }) {
    return this._request('/cards', {
      method: 'POST',
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, {
      method: 'DELETE',
    });
  }

  changeLikeStatus(id, isLiked) {
    return this._request(`/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
    });
  }
}

export default Api;
