export default function ImagePopup(props) {
  const isOpened = (props.card.link) ? 'popup_opened' : '';

  return (
    <div onClick={props.onClose} className={`popup ${isOpened}`}>
      <div onClick={((e) => e.stopPropagation())} className="image-popup__container">
        <button onClick={props.onClose} aria-label="закрыть" type="button" className="popup__close"></button>
        <img
        src={props.card.link}
        className="popup__image"
        alt={props.card.name}
        />
        <figure className="popup__subtitle">{props.card.name}</figure>
      </div>
    </div>

  )
}
