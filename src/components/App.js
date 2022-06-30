
import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardDelete, setCardDelete] = useState({});

  useEffect(() => {
    Promise.all([api.getInfoUser(), api.getInitialCards()])
    .then(([userData, cardData]) => {
      setCurrentUser(userData);
      setCards(cardData);
    }).catch(err =>
      console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(err =>
      console.log(err));
    } else {
      api.deleteLike(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(err =>
      console.log(err));
    }
  }

  function handleCardDelete(card) {
    api.deleteInitialCards(card._id).then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id));
      closeAllPopups();
    }).catch(err =>
      console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.editInfoUser(name, about).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(err =>
      console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(err =>
      console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api.postInitialCards(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(err =>
      console.log(err));
  }

  function handleTrashButtonClick(card) {
    setCardDelete(card);
    setIsConfirmPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

       <Header />

        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleTrashButtonClick}
          selectedCard={selectedCard}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />

        <ConfirmPopup
          card={cardDelete}
          isOpen={isConfirmPopupOpen}
          onConfirmDelete={handleCardDelete}
          onClose={closeAllPopups}
        />

        <Footer />

    </CurrentUserContext.Provider>
  );
}

export default App;
