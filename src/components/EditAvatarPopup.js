import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup({onUpdateAvatar, onClose, isOpen}) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }


  return (
    <PopupWithForm onClose={onClose} name="profile-popup" title="Редактировать профиль" isOpen={isOpen} onSubmit={handleSubmit}>
       <label className="popup__label">
          <input ref={avatarRef} required placeholder="Ссылка на картинку" name="avatar" type="url"
            className="popup__input popup__input_field_description" minLength="2" maxLength="200" autoComplete="off" />
          <span id="avatar-error" className="error"></span>
        </label>
        <button type="submit" className="popup__save">Сохранить</button>
    </PopupWithForm>
  )

}
