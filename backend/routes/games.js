// Файл routes/games.js

const gamesRouter = require('express').Router();
const { checkAuth } = require("../middlewares/auth.js");

const {
    findAllGames,
    checkIsGameExist,
    checkIfCategoriesAvaliable,
    findGameById,
    createGame,
    checkIfUsersAreSafe,
    updateGame,
    deleteGame,
    checkEmptyFields,
    checkIsVoteRequest
} = require('../middlewares/games.js');

const {
    sendAllGames,
    sendGameById,
    sendGameCreated,
    sendGameUpdated,
    sendGameDeleted
} = require('../controllers/games.js');




gamesRouter.get('/games', findAllGames, sendAllGames);
// gamesRouter.post("/games", findAllGames, createGame, sendGameCreated);


// Файл routes/games.js



gamesRouter.post(
    "/games",
    findAllGames,
    checkIsGameExist,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    createGame,
    sendGameCreated,
    checkAuth,
  );

  gamesRouter.get('/games/:id', findGameById, sendGameById);

  gamesRouter.put(
    "/games/:id", // Слушаем запросы по эндпоинту
    // Шаг 1. Находим игру по id из запроса
      findGameById,
      checkIsVoteRequest,
      // Шаг 2. Выполняем проверки для корректного обновления
      checkIfUsersAreSafe,
      checkIfCategoriesAvaliable,
    checkEmptyFields,
      // Шаг 3. Обновляем запись с игрой
      updateGame,
      // Шаг 4. Возвращаем на клиент ответ с результатом обновления
      sendGameUpdated,
      checkAuth,
  );


gamesRouter.delete(
    "/games/:id", // Слушаем запросы по эндпоинту
    deleteGame,
    checkAuth,
    sendGameDeleted // Тут будут функция удаления элементов из MongoDB и ответ клиенту
  );

  module.exports = gamesRouter;
