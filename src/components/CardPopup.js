
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


export {CardPopup}
