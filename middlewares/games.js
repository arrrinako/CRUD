// Файл middlewares/games.js

// Импортируем модель
const games = require("../models/game");

const findAllGames = async (req, res, next) => {
 console.log("GET /games");
 req.gamesArray=await games
 .find({})
 .populate("categories")
 .populate({
  path:"users",
  select:"-password"
 });
  next();
};

const createGame = async (req, res, next) => {
  console.log("POST /games");
  try {
    console.log(req.body);
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Error creating game");
  }
};

const findGameById = async (req, res, next) => {
  console.log("GET /games/:id");
  try {
      req.game = await games
      .findById(req.params.id)
      .populate("categories")
      .populate({
        path: "users",
        select: "-password"
      });
  next();
  } catch (error) {
      res.status(404).send({ message: "Game not found" });
  }
};

const checkEmptyFields = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
    // а ответим кодом 400 — данные неверны.
        res.status(400).send({ message: "Заполни все поля"} );
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
};

const checkIsGameExist = async(req, res, next)=>{
  console.log(req.gamesArray);
  const isInArray=req.gamesArray.find((game)=>{
    return req.body.title===game.title;
  });
  console.log(isInArray);
  if(isInArray){
    res.status(404).send({ message: "Игра  стаким названием не существует" });
  }else{
    next();
  }
};

// Файл middlewares/games.js

// Файл middlewares/games.js

const checkIfCategoriesAvaliable = async (req, res, next) => {
  // Проверяем наличие жанра у игры
if (!req.body.categories || req.body.categories.length === 0) {
  res.headers ={"Content-Type": "application/json"};
      res.status(400).send({message: "Выбери хотя бы одну категорию"} );
} else {
  next();
}
};

// Файл middlewares/games.js

const checkIfUsersAreSafe = async (req, res, next) => {
  console.log(req.body.users);
  // Проверим, есть ли users в теле запроса
if (!req.body.users) {
  next();
  return;
}
// Cверим, на сколько изменился массив пользователей в запросе
// с актуальным значением пользователей в объекте game
// Если больше чем на единицу, вернём статус ошибки 400 с сообщением
if (req.body.users.length - 1 === req.game.users.length) {
  next();
  return;
} else {
      res.status(400).send({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" });
}
};

// Файл middlewares/games.js

const updateGame = async (req, res, next) => {
  console.log("PUT /games/:id");
  try {
      // В метод передаём id из параметров запроса и объект с новыми свойствами
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка обновления игры" });
  }
};

// Файл middlewares/games.js

const deleteGame = async (req, res, next) => {
  console.log("DELETE /games/:id");
  try {
    // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
    req.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
        res.status(400).send({ message: "Ошибка удаления игры" });
  }
};





// Экспортируем функцию поиска всех игр
module.exports ={
  findAllGames,
  checkIsGameExist,
  createGame,
  findGameById,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
  updateGame,
  deleteGame
} ;