import React from 'react';

const Popup = React.memo(({
  isOpen,
  onClose,
  children
}) => {

  React.useEffect(() => {
    if (isOpen) {
      const handleEscClose = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }
      const overlayClosePopup = (e) => {
        if (!e.target.closest('.popup__container')) {
          onClose();
        }
      }

      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', overlayClosePopup);

      return () => {
        document.removeEventListener('keydown', handleEscClose);
        document.removeEventListener('mousedown', overlayClosePopup);
      };
    }
  }, [isOpen])

  return (
    <>
      {children}
    </>

  )
});

export default Popup;
