export default function PopupWithForm(props) {
  let isOpened = props.isOpen ? 'popup_opened' : "";

  return (
    <>
      <div onClick={props.onClose} className={`popup ${props.name} ${isOpened}`}>
        <div onClick={((e) => e.stopPropagation())} className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <form noValidate name={props.name} className="popup__form">
            {props.children}
          </form>
          <button onClick={props.onClose} aria-label="закрыть" type="button" className="popup__close"></button>
        </div>
      </div>
    </>
  )
}

