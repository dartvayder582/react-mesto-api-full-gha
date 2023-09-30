import React from 'react';
import headerLogo from '../images/logo-mesto.svg';
import { Divide as Hamburger } from 'hamburger-react'
import Navbar from './Navbar';

const Header = React.memo(({
  email,
  onSignOut,
  isLoggedIn,
  isLoadCheckToken }) => {

  const [isShowMobileNavbar, setIsShowMobileNavbar] = React.useState(false);

  React.useEffect(() => {
    setIsShowMobileNavbar(false);
  }, []);

  const handleMobileSignOut = () => {
    setIsShowMobileNavbar(false);
    setTimeout(onSignOut, 500);
  }

  return (
    <header className={`header ${isLoggedIn ? 'header_auth' : ''}`}>
      <div className="header__main-el">
        <img className="header__logo" src={headerLogo} alt="Место. Россия" />
        {isLoggedIn ? <Hamburger color='white' size={28} rounded onToggle={setIsShowMobileNavbar} /> : ''}
      </div>
      {isLoadCheckToken ? '' :
        <Navbar
          isLoggedIn={isLoggedIn}
          email={email}
          onSignOut={isShowMobileNavbar ? handleMobileSignOut : onSignOut}
          isShowMobileNavbar={isShowMobileNavbar} />
      }
    </header>
  );
});

export default Header;
