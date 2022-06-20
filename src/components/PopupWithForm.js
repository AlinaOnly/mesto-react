import React from 'react';

function PopupWithForm(props) {
  return (
     <div className={props.isOpen ? `popup popup_type_${props.name} popup_open` : "popup"}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close-button button-hover" type="button" aria-label="Закрыть попап"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" id={props.name} name="profileSubmitForm" noValidate>
          {props.children}
          <button className="popup__submit-button" type="submit" value="Сохранить">{props.submitbuttonText ?? "Сохранить"}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
