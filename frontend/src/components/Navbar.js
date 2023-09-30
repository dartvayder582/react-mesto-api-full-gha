import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AnimatedNavbar from './animation/AnimatedNavbar';
import { AnimatePresence } from 'framer-motion';

const Navbar = React.memo(({
  isShowMobileNavbar,
  email,
  onSignOut }) => {

  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route
          path="/signin"
          element={
            <AnimatedNavbar>
              <nav className="navbar">
                <Link
                  to='/signup'
                  type="button"
                  className="navbar__link link-style"
                >Регистрация</Link>
              </nav>
            </AnimatedNavbar>
          } />
        <Route
          path="/signup"
          element={
            <AnimatedNavbar>
              <nav className="navbar">
                <Link
                  to='/signin'
                  type="button"
                  className="navbar__link link-style"
                >Войти</Link>
              </nav>
            </AnimatedNavbar>
          } />
        <Route
          exact path="/"
          element={
            <AnimatedNavbar>
              <nav className={`navbar navbar_auth ${isShowMobileNavbar ? 'navbar_active' : ''}`}>
                <p className='navbar__email'>{email}</p>
                <Link
                  to='/signin'
                  type="button"
                  onClick={onSignOut}
                  className="navbar__link link-style navbar__link_auth"
                >Выйти</Link>
              </nav>

            </AnimatedNavbar>
          } />
      </Routes>
    </AnimatePresence>
  )
})

export default Navbar;
