const Cards = require('../models/card');
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require('../errors');

const getCards = (req, res, next) => Cards.find({})
  .sort('-createdAt')
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Cards.create(
    {
      name,
      link,
      owner: req.user._id,
    },
  )
    .then((newCard) => res.status(201).send(newCard))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  return Cards.findById(cardId)
    .then((checkCard) => {
      if (!checkCard) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      } else if (checkCard.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }

      return Cards.deleteOne(checkCard)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError('Некорректный id карточки'));
          }
          return next(err);
        });
    })
    .catch(next);
};

const handleLikeCard = (req, res, next, method) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { [method]: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const addLikeCard = (req, res, next) => handleLikeCard(req, res, next, '$addToSet');

const deleteLikeCard = (req, res, next) => handleLikeCard(req, res, next, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
