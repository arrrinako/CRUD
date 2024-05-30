const gamesRouter = require("express").Router();

const {
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  findGameById,
  createGame,
  checkIfUsersAreSafe,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIsVoteRequest,
} = require("../middlewares/games.js");
const {
  sendAllGames,
  sendGameById,
  sendGameCreated,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games.js");
const { checkAuth } = require("../middlewares/auth.js");

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  createGame,
  sendGameCreated
);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  updateGame,
  sendGameUpdated
);
gamesRouter.delete("/games/:id", deleteGame, checkAuth, sendGameDeleted);

module.exports = gamesRouter;