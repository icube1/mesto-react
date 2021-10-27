import React from 'react';
import deleteButton from '../images/delete-card-button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';



export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);


  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cadLikeButtonClassName = (
    `${isLiked ? 'element__like-button element__like-button_active' : 'element__like-button'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onDelete(props.card);
  }


  return (
      <article className="element">
        <img src={props.link}
        alt=""
        className="element__cover"
        onClick={handleClick}
        />
        <img onClick={handleDeleteClick} src={deleteButton} alt="Удалить карточку" className={cardDeleteButtonClassName} />
        <div className="element__description">
          <h2 className="element__title">{props.name}</h2>
          <div className="element__like-container">
          <button onClick={handleLikeClick} aria-label="понравилось" type="button" className={cadLikeButtonClassName}></button>
          <p className="element__like-button_quantity">{props.likes.length}</p></div>
        </div>
      </article>
  )
}
