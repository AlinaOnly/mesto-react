
import React , { useState } from 'react';
import api from '../utils/api';
import Card from './Card';
import avatar from '../images/avatar.jpg';

function Main ( {onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState('User');
  const [userDescription, setUserDescription] = useState('About');
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    Promise.all([api.getInfoUser(), api.getInitialCards()])
    .then(([userData, cardData]) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
      setCards(cardData);
    }).catch(err =>
      console.log(err));
  }, []);

  return (
      <main className="content page__container">
          <section className="profile">
            <div className="profile__avatar-edit">
              <button onClick={onEditAvatar} className="profile__avatar-button" type="button" title="Изменить аватар"></button>
              <img src={userAvatar} alt="Аватар" className="profile__avatar" />
            </div>
              <div className="profile__info">
                <div className="profile__description">
                  <h1 className="profile__username">{userName}</h1>
                  <p className="profile__job">{userDescription}</p>
                </div>
                <button onClick={onEditProfile} className="profile__edit-button button-hover" type="button" aria-label="Редактировать"></button>
              </div>
              <button onClick={onAddPlace} className="profile__add-button button-hover" type="button" aria-label="Добавить"></button>
          </section>
          <section className="elements" aria-label="Секция с фото">
            {cards.map(card => <Card key={card._id} onCardClick={onCardClick} card={card} />)}
          </section>
      </main>
    );
}

export default Main;
