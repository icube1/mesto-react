import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup (props) {
  const [title, setTitle] = React.useState('');
  const[link, setLink] = React.useState('');


  function handleChangeTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
  evt.preventDefault();

  props.onAddPlace({title, link})
}

  return (
    <PopupWithForm onClose={props.onClose} name="card-popup" title="Новое место"  isOpen={props.isOpen} onSubmit={handleSubmit}>
        <label className="popup__label">
          <input required placeholder="Название" name="title" type="text" className="popup__input popup__input_field_name"
            minLength="2" maxLength="40" autoComplete="off" value={title} onChange={handleChangeTitle}/>
          <span id="title-error" className="error"></span>
        </label>
        <label className="popup__label">
          <input type="url" required placeholder="Ссылка на картинку" name="link"
            className="popup__input popup__input_field_description" autoComplete="off" value={link} onChange={handleChangeLink}/>
          <span id="link-error" className="error"></span>
        </label>
        <button type="submit" className="popup__save">Создать</button>
    </PopupWithForm>
  )
}
