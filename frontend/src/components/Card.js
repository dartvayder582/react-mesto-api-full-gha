import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = React.memo(({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);

  const [isImgError, setIsImgError] = React.useState(false);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="place">
      {isOwn && <button type="button" className="place__delete-button" aria-label="Удалить" onClick={handleDeleteClick} />}
      <img className={`place__image ${isImgError ? 'place__image_error' : ''}`}
        aria-label={card.name}
        src={card.link}
        alt={' '}
        onClick={!isImgError ? handleClick : null}
        onError={() => setIsImgError(true)} />
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like">
          <button type="button" className={`place__like-button ${isLiked ? 'place__like-button_active' : ''}`} aria-label="Нравится" onClick={handleLikeClick} />
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
});

export default Card;
