const router = require('express').Router();
const { createCardValidation, cardIdValidation } = require('../utils/validationSchema');

const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post(
  '/',
  createCardValidation,
  createCard,
);
router.delete(
  '/:cardId',
  cardIdValidation,
  deleteCard,
);
router.put(
  '/:cardId/likes',
  cardIdValidation,
  addLikeCard,
);
router.delete(
  '/:cardId/likes',
  cardIdValidation,
  deleteLikeCard,
);

module.exports = router;
