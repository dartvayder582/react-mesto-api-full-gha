import React from 'react';
import Popup from './Popup';

const InfoTooltip = React.memo(({ isOpen, text, icon, onClose }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={`popup popup_type_infoTooltip ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_infoTooltip">
          <button
            type="button"
            className="popup__close-button"
            aria-label="Закрыть окно"
            onClick={onClose} />
          <div className='infoTooltip'>
            <img
              className='infoTooltip__img'
              src={icon}
              alt={text} />
            <p className='infoTooltip__text'>{text}</p>
          </div>
        </div>
      </div>
    </Popup>

  )
});

export default InfoTooltip;
