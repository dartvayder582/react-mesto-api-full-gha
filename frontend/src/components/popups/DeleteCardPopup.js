import React from 'react';
import PopupWithForm from './PopupWithForm';

const DeleteCardPopup = React.memo(({
  isOpen,
  onClose,
  card,
  onDeleteCard,
  isLoad }) => {
  function handleSubmit(e) {
    e.preventDefault();

    onDeleteCard({
      cardId: card._id
    });
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      buttonStatus={isLoad}
      buttonText={!isLoad ? "Да" : "Удаление..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit} />
  )
});

export default DeleteCardPopup;
