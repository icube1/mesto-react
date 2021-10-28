import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


export default function EditProfilePopup({onUpdateProfile, isOpen, onClose}) {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value)
  }
  function handleChangeAbout(evt) {
    setAbout(evt.target.value)
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateProfile({name, about})
  }

  const currentUser = React.useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [ currentUser, isOpen ])

  return (
    <PopupWithForm onClose={onClose} name="profile-popup" title="Редактировать профиль" isOpen={isOpen} onSubmit={handleSubmit}>
          <label className="popup__label">
            <input required placeholder="Имя" name="name" type="text"
              className="popup__input popup__input_field_name" minLength="2" maxLength="40" autoComplete="off" value={name} onChange={handleChangeName} />
            <span id="name-error" className="error"></span>
            </label>
          <label className="popup__label">
              <input required placeholder="Профессиональная деятельность" name="about" type="text"
                className="popup__input popup__input_field_description" minLength="2" maxLength="200" autoComplete="off" value={about} onChange={handleChangeAbout} />
              <span id="about-error" className="error"></span>
          </label>
            <button type="submit" className="popup__save">Сохранить</button>
    </PopupWithForm>
    )
}
