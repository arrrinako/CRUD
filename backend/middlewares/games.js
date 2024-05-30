// Файл middlewares/games.js

// Импортируем модель
const games = require("../models/game");

// middlewares/games.js

const findAllGames = async (req, res, next) => {
  // Поиск всех игр в проекте по заданной категории
  if(req.query["categories.name"]) { 
    req.gamesArray = await games.findGameByCategory(req.query["categories.name"]);
    next();
    return;
  }
  // Поиск всех игр в проекте
  req.gamesArray = await games
    .find({})
    .populate("categories")
    .populate({
      path: "users",
      select: "-password" // Исключим данные о паролях пользователей
    })
  next();
};

const checkIsVoteRequest = async (req, res, next) => {
  // Если в запросе присылают только поле users
if (Object.keys(req.body).length === 1 && req.body.users) {
  req.isVoteRequest = true;
}
next();
};


const checkEmptyFields = async (req, res, next) => {
  if(req.isVoteRequest){
    next();
    return;
  }
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
  const isInArray=req.gamesArray.find((game)=>{
    return req.body.title===game.title;
  });
  if(isInArray){
    res.status(404).send({ message: "Игра  стаким названием не существует" });
  }else{
    next();
  }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  if(req.isVoteRequest){
    next();
    return;
  }
  // Проверяем наличие жанра у игры
if (!req.body.categories || req.body.categories.length === 0) {
  res.headers ={"Content-Type": "application/json"};
      res.status(400).send({message: "Выбери хотя бы одну категорию"} );
} else {
  next();
}
};

const findGameById = async (req, res, next) => {
  console.log("GET /api/games/:id");
  try {
      req.game = await games
      .findById(req.params.id)
      .populate("categories")
      .populate("users");
  next();
  } catch (error) {
      res.status(404).send({ message: "Game not found" });
  }
};


const createGame = async (req, res, next) => {
  console.log("POST /api/games");
  try {
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Error creating game");
  }
};

const checkIfUsersAreSafe = async (req, res, next) => {
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

const updateGame = async (req, res, next) => {
  console.log("PUT /api/games/:id");
  try {
      // В метод передаём id из параметров запроса и объект с новыми свойствами
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка обновления игры" });
  }
};







// Файл middlewares/games.js

// Файл middlewares/games.js



// Файл middlewares/games.js



// Файл middlewares/games.js



// Файл middlewares/games.js

const deleteGame = async (req, res, next) => {
  console.log("DELETE /api/games/:id");
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
  deleteGame,
  checkIsVoteRequest,
} ;