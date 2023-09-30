import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../animation/AnimatedPage';

const Register = ({ isLoad, onRegister }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue.email, formValue.password);
  }

  return (
    <AnimatedPage>
      <div className="authentication">
        <form className="form form_auth" onSubmit={handleSubmit}>
          <h2 className="form__heading form__heading_theme_dark">Регистрация</h2>
          <input
            className="form__input form__input_theme_dark"
            required
            placeholder="Email"
            id="email" name="email"
            type="email"
            value={formValue.email}
            onChange={handleChange} />
          <span className="form__error place-title-error"></span>
          <input
            className="form__input form__input_theme_dark"
            required
            placeholder="Пароль"
            id="password"
            name="password"
            type="password"
            value={formValue.password}
            onChange={handleChange} />
          <span className="form__error place-title-error"></span>
          <button
            type="submit"
            className="form__submit-button form__submit-button_theme_dark"
            aria-label="Зарегистрироваться"
            disabled={isLoad} >
            {!isLoad ? "Зарегистрироваться" : "Регистрация..."}
          </button>
        </form>
        <p className="authentication__signin">Уже зарегистрированы? {<Link to="/signin" className="link-style">Войти</Link>}</p>

      </div>
    </AnimatedPage>

  );
}

export default Register;
