function ProfilePopup() {
  return (
  <>
    <label className="popup__label">
    <input required placeholder="Имя" name="name" type="text"
      className="popup__input popup__input_field_name" minLength="2" maxLength="40" autoComplete="off" />
    <span id="name-error" className="error"></span>
    </label>
    <label className="popup__label">
      <input required placeholder="Профессиональная деятельность" name="about" type="text"
        className="popup__input popup__input_field_description" minLength="2" maxLength="200" autoComplete="off" />
      <span id="about-error" className="error"></span>
    </label>
    <button type="submit" className="popup__save">Сохранить</button>
</>
  )
}

function CardPopup() {
  return (
    <>
        <label className="popup__label">
          <input required placeholder="Название" name="title" type="text" className="popup__input popup__input_field_name"
            minLength="2" maxLength="40" autoComplete="off" />
          <span id="title-error" className="error"></span>
        </label>
        <label className="popup__label">
          <input type="url" required placeholder="Ссылка на картинку" name="link"
            className="popup__input popup__input_field_description" autoComplete="off" />
          <span id="link-error" className="error"></span>
        </label>
        <button disabled type="submit" className="popup__save popup__save_invalid">Создать</button>
    </>
  )
}

function DeletePopup() {
  return (
    <>
      <button aria-label="Закрыть" type="submit" className="popup__save">Да</button>
    </>
  )
}

function AvatarPopup() {
  return (
    <>
       <label className="popup__label">
          <input required placeholder="Ссылка на картинку" name="avatar" type="url"
            className="popup__input popup__input_field_description" minLength="2" maxLength="200" autoComplete="off" />
          <span id="avatar-error" className="error"></span>
        </label>
        <button disabled type="submit" className="popup__save">Сохранить</button>
    </>
  )
}

export {AvatarPopup, DeletePopup, CardPopup, ProfilePopup}
