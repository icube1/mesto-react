import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { currentCards } from '../contexts/CardContext.js';


export default function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [about, setAbout] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value)
  }
  function handleChangeAbout(evt) {
    setAbout(evt.target.value)
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateProfile({name, about})
  }

  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [ currentUser, props.isOpen ])

  return (
    <PopupWithForm onClose={props.onClose} name="profile-popup" title="Редактировать профиль" isOpen={props.isOpen} onSubmit={handleSubmit}>
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
