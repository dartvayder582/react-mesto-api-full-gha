import React, { useState } from 'react';
import AnimatedPage from '../animation/AnimatedPage';

const Login = ({ isLoad, onLogin }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    onLogin(formValue.email, formValue.password)
  }

  return (
    <AnimatedPage>
      <div className="authentication">
        <form className="form form_auth" onSubmit={handleSubmit}>
          <h2 className="form__heading form__heading_theme_dark">Вход</h2>
          <input
            className="form__input form__input_theme_dark"
            required
            placeholder="Email"
            id="email"
            name="email"
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
            aria-label="Войти"
            disabled={isLoad} >{!isLoad ? "Войти" : "Вход..."}</button>
        </form>
      </div>
    </AnimatedPage>
  )
}

export default Login;
