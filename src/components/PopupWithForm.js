export default function PopupWithForm({isOpen, onClose, name, title, children, onSubmit}) {
  let isOpened = isOpen ? 'popup_opened' : "";

  return (
      <div onClick={onClose} className={`popup ${name} ${isOpened}`}>
        <div onClick={((e) => e.stopPropagation())} className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form noValidate name={name} className="popup__form" onSubmit={onSubmit}>
            {children}
          </form>
          <button onClick={onClose} aria-label="закрыть" type="button" className="popup__close"></button>
        </div>
      </div>
  )
}

