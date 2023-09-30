import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = React.memo(({ isOpen, onClose, onUpdateAvatar, isLoad }) => {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonStatus={isLoad}
      buttonText={!isLoad ? "Сохранить" : "Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="form__input-container">
        <input
          type="url"
          className="form__input"
          id="user-avatar"
          placeholder="Ссылка на картинку"
          name="userAvatar"
          ref={avatarRef}
          required />
        <span className="form__error user-avatar-error"></span>
      </fieldset>
    </PopupWithForm>
  )
});

export default EditAvatarPopup;
