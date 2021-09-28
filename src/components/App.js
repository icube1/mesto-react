import React from 'react';
import './App.css';
import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import {AvatarPopup, DeletePopup, CardPopup, ProfilePopup} from './PopupChildren.js';
import ImagePopup from './ImagePopup.js';

function App() {
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})

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

  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDelete={handleDeleteCardClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm onClose={closeAllPopups} name="profile-popup" title="Редактировать профиль" children={<ProfilePopup />} isOpen={isEditProfilePopupOpen} />


      <PopupWithForm onClose={closeAllPopups} name="card-popup" title="Новое место" children={<CardPopup />}  isOpen={isAddPlacePopupOpen} />


      <PopupWithForm onClose={closeAllPopups} name="delete-popup" title="Вы уверены?" children={<DeletePopup />}  isOpen={isDeleteCardPopupOpen} />


      <PopupWithForm onClose={closeAllPopups} name="avatar-popup" title="Обновить аватар" children={<AvatarPopup />}  isOpen={isEditAvatarPopupOpen} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
  </>
  );
}

export default App;
