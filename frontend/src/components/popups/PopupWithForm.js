import React from 'react';
import Popup from './Popup';

const PopupWithForm = React.memo(({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
  buttonStatus }) => {

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_form">
          <button
            type="button"
            className="popup__close-button"
            aria-label="Закрыть окно"
            onClick={onClose} />
          <form
            className="form form_popup"
            name={name}
            method="post"
            onSubmit={onSubmit} >
            <h2 className="form__heading">{title}</h2>
            {children}
            <button
              type="submit"
              className="form__submit-button"
              aria-label={buttonText}
              disabled={buttonStatus} >{buttonText}</button>
          </form>
        </div>
      </div>
    </Popup>

  )
});

export default PopupWithForm;
