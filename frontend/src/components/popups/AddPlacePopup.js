import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = React.memo(({ isOpen, onClose, onAddPlace, isLoad }) => {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText={!isLoad ? "Создать" : "Создание..."}
      buttonStatus={isLoad}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="form__input-container">
        <input
          type="text"
          className="form__input"
          id="place-title"
          placeholder="Название"
          name="placeTitle"
          required minLength="2"
          maxLength="30"
          ref={nameRef} />
        <span className="form__error place-title-error"></span>
        <input
          type="url"
          className="form__input"
          id="place-img"
          placeholder="Ссылка на картинку"
          name="placeImg"
          required
          ref={linkRef} />
        <span className="form__error place-img-error"></span>
      </fieldset>
    </PopupWithForm>
  )
});

export default AddPlacePopup;
