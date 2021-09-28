import deleteButton from '../images/delete-card-button.svg'

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
      <article className="element">
        <img src={props.link}
        alt=""
        className="element__cover"
        onClick={handleClick}
        />
        <img onClick={props.onDelete} src={deleteButton} alt="Удалить карточку" className="element__delete-button" />
        <div className="element__description">
          <h2 className="element__title">{props.name}</h2>
          <div className="element__like-container">
          <button aria-label="понравилось" type="button" className="element__like-button"></button>
          <p className="element__like-button_quantity">{props.likes.length}</p></div>
        </div>
      </article>
  )
}
