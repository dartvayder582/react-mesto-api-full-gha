import React from 'react';
import Popup from './Popup';

const ImagePopup = React.memo(({ isOpen, card, onClose }) => {

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={`popup popup_type_figure ${isOpen ? 'popup_opened' : ''}`}>
        <figure className="popup__container popup__container_fig">
          <button
            type="button"
            className="popup__close-button"
            aria-label="Закрыть окно"
            onClick={onClose} />
          <img className="popup__figure-image"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="popup__figure-caption">{card.name}</figcaption>
        </figure>
      </div>
    </Popup>

  )
});

export default ImagePopup;
