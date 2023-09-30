import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const EditProfilePopup = React.memo(({ isOpen, onClose, onUpdateUser, isLoad }) => {

  const currentUser = React.useContext(CurrentUserContext);

  const [formValue, setFormValue] = React.useState({
    name: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  React.useEffect(() => {
    setFormValue({
      name: currentUser.name,
      description: currentUser.about
    })
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: formValue.name,
      about: formValue.description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonStatus={isLoad}
      buttonText={!isLoad ? "Сохранить" : "Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="form__input-container">
        <input
          type="text"
          className="form__input"
          id="name"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={formValue.name}
          onChange={handleChange} />
        <span className="form__error user-name-error"></span>
        <input
          type="text"
          className="form__input"
          id="description"
          name="description"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={formValue.description}
          onChange={handleChange} />
        <span className="form__error user-job-error"></span>
      </fieldset>
    </PopupWithForm>
  )
});

export default EditProfilePopup;
