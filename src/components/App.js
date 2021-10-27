import React from 'react';
import './App.css';
import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import {AvatarPopup, DeletePopup, CardPopup } from './PopupChildren.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardContext, currentCards } from '../contexts/CardContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'

function App() {
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
const [cards, setCards] = React.useState([]);

const [currentUser, setCurrentUser] = React.useState({
  name: "Имя",
  about: "О себе",
  avatar: "",
  _id: "",
});

React.useEffect(() => { ///получение профиля пользователя
  api.getData()
  .then((data) => {
    const [userInfo, cards] = data;
    setCurrentUser(userInfo);
  })
  .catch((err) => console.log(err));
}, [] );

React.useEffect(() => {
  api.getInitialCards('cards')
  .then((data) => {
    setCards(data)
      })
  .catch((err) => console.log(err))
}, [] );


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleDeleteCardClick() {
    setDeleteCardPopupOpen(!isDeleteCardPopupOpen)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard({name: '', link: ''})
  }

  function handleCardClick(props) {
    setSelectedCard(props)
  }

  function handleUpdateProfile(data) {
    api.updateProfile(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked){
    api.addLike(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
    .catch((err) => console.log(err))
   }
   else {
     api.removeLike(card._id, !isLiked)
     .then((newCard) => {
       setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
   })
     .catch((err) => console.log(err))
   }
}

function handleCardDelete(card) {
  api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((item) => card._id !== item._id)
      setCards(newCards)
  }).catch((err) => console.log(err))
}


  function addPlaceSubmit(card) {
    api.addCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    api.getInitialCards('cards')
    .then((data) => {
      setCards(data)
        })
    .catch((err) => console.log(err))
  }, [] );

  const cardElements = cards.map((card) => {
    return (
      <Card key={card._id} card={card} link={card.link} name={card.name} likes={card.likes} onDelete={handleCardDelete} onCardClick={handleCardClick} onCardLike={handleCardLike} />
    )
  });


  return (
    <>
      <CurrentUserContext.Provider value={ currentUser }>
      <CardContext.Provider value={ currentCards }>

        <Header />
        <Main cards={cardElements} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDelete={handleDeleteCardClick} onCardClick={handleCardClick} />
        <Footer />

        <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateProfile={handleUpdateProfile}/>

        <AddPlacePopup onClose={closeAllPopups} name="card-popup" title="Новое место" children={<CardPopup />}  isOpen={isAddPlacePopupOpen} onAddPlace={addPlaceSubmit}/>

        <PopupWithForm onClose={closeAllPopups} name="delete-popup" title="Вы уверены?" children={<DeletePopup />}  isOpen={isDeleteCardPopupOpen} />

        <EditAvatarPopup onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </CardContext.Provider>
      </CurrentUserContext.Provider>

  </>
  );
}

export default App;
