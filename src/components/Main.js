import React from 'react';
import {api} from '../utils/Api.js';
import avatarEdit from '../images/profile__avatar-edit.svg';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

export default function Main(props) {
  const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api.getInitialCards('cards')
    .then((data) => {
      setCards(data)
        })
    .catch((err) => console.log(err))
  }, [] );

  const cardElements = cards.map((card) => {
    return (
      <Card key={card._id} card={card} link={card.link} name={card.name} likes={card.likes} onDelete={props.onDelete} onCardClick={props.onCardClick} />
    )
  });


  return (
    <main className="main">
    <section className="profile">
      <div className="profile__avatar-container">
        <img
          onClick={props.onEditAvatar}
          src={currentUser.avatar}
          alt="Аватар пользователя"
          className="profile__avatar"
        />
        <img src={avatarEdit}
        alt="Изменить аватар"
        className="profile__avatar-edit"
       />
      </div>

      <div className="profile__info">
        <div className="profile__name-container">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} aria-label="Редактировать профиль" type="button" className="profile__edit-button"></button>
        </div>
        <p className="profile__description">{currentUser.about}</p>
      </div>
      <button  onClick={props.onAddPlace} aria-label="Добавить место" type="button" className="profile__add-card"></button>
    </section>
    <section className="elements">
      {cardElements}
    </section>
  </main>
  )
}
