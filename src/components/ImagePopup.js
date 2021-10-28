export default function ImagePopup({ card, onClose }) {
  const isOpened = (card.link) ? 'popup_opened' : '';

  return (
    <div onClick={onClose} className={`popup ${isOpened}`}>
      <div onClick={((e) => e.stopPropagation())} className="image-popup__container">
        <button onClick={onClose} aria-label="закрыть" type="button" className="popup__close"></button>
        <img
        src={card.link}
        className="popup__image"
        alt={card.name}
        />
        <figure className="popup__subtitle">{card.name}</figure>
      </div>
    </div>

  )
}
