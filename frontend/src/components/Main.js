import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AnimatedPage from './animation/AnimatedPage';

const Main = React.memo(({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <AnimatedPage>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
            <button
              type="button"
              className="profile__avatar-button"
              aria-label="Редактировать фото профиля"
              onClick={onEditAvatar} />
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__job">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Радактировать профиль"
              onClick={onEditProfile} />
          </div>
          <button
            type="button"
            className="profile__add-button"
            aria-label="Добавить место"
            onClick={onAddPlace} />
        </section>
        <section>
          <ul className="places list-style">
            {cards.map((item, i) => (
              <li key={item._id}>
                <Card
                  card={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete} />
              </li>

            ))}
          </ul>
        </section>

      </main>
    </AnimatedPage>

  );
});

export default Main;
