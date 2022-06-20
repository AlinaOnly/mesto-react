
import React from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
    setSelectedCard({});
  }

  return (
    <>
       <Header />

        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" name="profileSubmitForm">
          <input type="text" id="username" name="name" className="popup__form-el popup__form-el_type_name"
            placeholder="Введите имя" minLength="2" maxLength="40" required />
          <span id="username-error" className="popup__input-error"></span>
          <input type="text" id="job" name="about" className="popup__form-el popup__form-el_type_job"
            placeholder="Расскажите о себе" minLength="2" maxLength="200" required />
          <span id="job-error" className="popup__input-error"></span>
        </PopupWithForm>

        <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} submitbuttonText="Создать" title="Новое место" name="newCardAddForm">
          <input type="text" id="title" name="name" className="popup__form-el popup__form-el_type_title"
            placeholder="Новое место" minLength="2" maxLength="40" required />
          <span id="title-error" className="popup__input-error"></span>
          <input type="url" id="link" name="link" className="popup__form-el popup__form-el_type_link"
            placeholder="Ссылка на картинку" minLength="2" maxLength="200" required />
          <span id="link-error" className="popup__input-error"></span>
        </PopupWithForm>

        <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" name="newAvatar">
          <input type="url" id="avatar" name="avatar" className="popup__form-el popup__form-el_type_avatar"
            placeholder="Ссылка на новый аватар" required />
          <span id="avatar-error" className="popup__input-error"></span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm onClose={closeAllPopups} title="Вы уверены?" name="confirmImageDelete" submitbuttonText="Да" />

        <Footer />
    </>
  );
}

export default App;
