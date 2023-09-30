import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './popups/ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import AddPlacePopup from './popups/AddPlacePopup';
import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import DeleteCardPopup from './popups/DeleteCardPopup';
import InfoTooltip from './popups/InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import Login from './auth/Login';
import Register from './auth/Register';
import rejecr from '../images/reject-icon.svg';
import resolve from '../images/resolve-icon.svg';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);
  const [email, setEmail] = useState("");

  // попапы
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  // карточки
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  // индикаторы загрузки
  const [isLoadDeleteCard, setIsLoadDeleteCard] = useState(false);
  const [isLoadAddCard, setIsLoadAddCard] = useState(false);
  const [isLoadEditProfile, setIsLoadEditProfile] = useState(false);
  const [isLoadUpdateAvatar, setIsLoadUpdateAvatar] = useState(false);
  const [isLoadLogin, setIsLoadLogin] = useState(false);
  const [isLoadRegister, setIsLoadRegister] = useState(false);
  const [isLoadCheckToken, setIsLoadCheckToken] = useState(false);
  const [isLoadMain, setIsLoadMain] = useState(false);

  // проверка токена
  useEffect(() => {
    const token = localStorage.getItem('userId');
    if (token) {
      setIsLoadCheckToken(true);
      auth.checkToken()
        .then((res) => {
          setIsLoggedIn(true);
          navigate('/', { replace: true });
          setEmail(res.email);
          setIsLoadMain(true);
        })
        .catch((err) => {
          // localStorage.removeItem("userId");
          console.error(err);
        })
        .finally(() => setIsLoadCheckToken(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('userId');
    if (isLoggedIn && token) {
      Promise.all([api.getUserData(), api.getCardInfo()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadMain(false);
        });
    }
  }, [isLoggedIn]);

  // аутентификация
  const onLogin = (email, password) => {
    setIsLoadLogin(true);
    auth.authorize(email, password)
      .then((data) => {
        // console.log(data.token);
        if (data._id) {
          localStorage.setItem("userId", data._id);
          setIsLoggedIn(true);;
          navigate('/', { replace: true });
          setEmail(email)
        }
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessInfoTooltipStatus(false);
      })
      .finally(() => {
        setIsLoadLogin(false);
      });
  }
  const onRegister = (email, password) => {
    setIsLoadRegister(true);
    auth.register(email, password)
      .then(() => {
        navigate('/signin', { replace: true });
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessInfoTooltipStatus(true);
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessInfoTooltipStatus(false);
      })
      .finally(() => {
        setIsLoadRegister(false);
      });
  }
  const onSignOut = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  }

  // обработчики открытия попапов
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = ((card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card)
  });
  const handleDeletePopup = (card) => {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  // лайк и удаление карточки
  const handleCardLike = ((card) => {
    const isLiked = card.likes.some(id => id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const handleCardDelete = ({ cardId }) => {
    setIsLoadDeleteCard(true);
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadDeleteCard(false);
      });
  };

  // запросы
  const handleUpdateUser = ({ name, about }) => {
    setIsLoadEditProfile(true);
    api.updateUserInfo({
      name,
      about
    })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadEditProfile(false);
      });
  }
  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoadUpdateAvatar(true);
    api.updateUserAvatar({
      avatar,
    })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadUpdateAvatar(false);
      });
  }
  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoadAddCard(true);
    api.addCard({
      name,
      link
    })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadAddCard(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onSignOut={onSignOut}
        isLoggedIn={isLoggedIn}
        email={email}
        isLoadCheckToken={isLoadCheckToken} />

      {isLoadCheckToken ? <div>Загрузка информации...</div> :
        <AnimatePresence mode='wait'>
          <Routes key={location.pathname} location={location}>
            <Route
              path="/signin"
              element={
                <Login
                  isLoad={isLoadLogin}
                  onLogin={onLogin} />
              } />
            <Route
              path="/signup"
              element={
                <Register
                  isLoad={isLoadRegister}
                  onRegister={onRegister} />
              } />
            <Route
              path="*"
              element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
            <Route
              exact path="/"
              element={
                <>
                  {isLoadMain ? <div>Загрузка...</div> :
                    <>
                      <ProtectedRouteElement
                        element={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        cards={cards}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeletePopup}
                        isLoggedIn={isLoggedIn} />
                      <Footer />
                    </>
                  }
                </>}
            />
          </Routes>
        </AnimatePresence>
      }

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoad={isLoadEditProfile} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoad={isLoadUpdateAvatar} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoad={isLoadAddCard} />
      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        card={selectedCard} onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        isLoad={isLoadDeleteCard} />
      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups} />

      {isSuccessInfoTooltipStatus ?
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          icon={resolve}
          text='Вы успешно зарегистрировались!'
          onClose={closeAllPopups} />
        :
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          icon={rejecr}
          text='Что-то пошло не так! Попробуйте ещё раз.'
          onClose={closeAllPopups} />
      }

    </CurrentUserContext.Provider>
  );
}

export default App;
