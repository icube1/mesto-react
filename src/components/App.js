import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import Card from './Card.js';
import { CardPopup } from './CardPopup.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';

function App() {
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
const [deletedCard, setDeletedCard] = useState({name: '', link: ''})
const [cards, setCards] = useState([]);
const [currentUser, setCurrentUser] = useState({});

useEffect(() => { ///получение профиля пользователя
  api.getData()
  .then((data) => {
    const [userInfo, cards] = data;
    setCurrentUser(userInfo);
    setCards(cards);
  })
  .catch((err) => console.log(err));
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

  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setDeletedCard({name: '', link: '', _id: ''});
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

  useEffect(() => {
    api.getInitialCards('cards')
    .then((data) => {
      setCards(data)
        })
    .catch((err) => console.log(err))
  }, [] );

  const cardElements = cards.map((card) => {
    return (
      <Card key={card._id} card={card} link={card.link} name={card.name} likes={card.likes} onDelete={handleDeleteCardClick} onCardClick={handleCardClick} onCardLike={handleCardLike} />
    )
  });


  return (
      <CurrentUserContext.Provider value={ currentUser }>
        <Header />
        <Main cards={cardElements} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDelete={handleDeleteCardClick} onCardClick={handleCardClick} />
        <Footer />

        <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateProfile={handleUpdateProfile}/>

        <AddPlacePopup onClose={closeAllPopups} children={<CardPopup />}  isOpen={isAddPlacePopupOpen} onAddPlace={addPlaceSubmit}/>

        <DeletePopup card={deletedCard} onClose={closeAllPopups} isOpen={isDeleteCardPopupOpen} onSubmit={handleCardDelete} />

        <EditAvatarPopup onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
  );
}

export default App;
