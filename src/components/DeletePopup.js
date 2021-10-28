import PopupWithForm from "./PopupWithForm";

export default function DeletePopup({ card, onSubmit, onClose, isOpen }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
    onClose()
  }

  return (
    <PopupWithForm card={card} name="delete-popup" title="Вы уверены?" onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen}>
        <label style={{ zIndex: "-1"}} className="popup__label">
          <input disabled type="url" required placeholder="Костыль :)" name="link"
            className="popup__input popup__input_field_description" autoComplete="off" />
          <span id="link-error" className="error"></span>
        </label>
      <button aria-label="Закрыть" type="submit" className="popup__save">Да</button>
    </PopupWithForm>
  )
}
