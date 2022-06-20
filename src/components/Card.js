
import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
        <article className="element">
            <button className="element__trash-button" type="button" title="Удалить"></button>
            <img onClick={handleClick}  src={props.card.link} alt={props.card.name} className="element__photo" />
            <div className="element__container">
              <h2 className="element__text">{props.card.name}</h2>
              <div className="element__heart-container">
                <button className="element__heart-button" type="button" aria-label="Нравится"></button>
                <p className="element__heart-counter">{props.card.likes.length}</p>
              </div>
            </div>
        </article>
  );
}

export default Card;