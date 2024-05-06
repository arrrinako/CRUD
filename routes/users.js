const usersRouter = require('express').Router();

const { 
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    checkIsUserExists,
    checkEmptyNameAndEmail,
    checkEmptyNameAndEmailAndPassword
}=require('../middlewares/users.js');

const {
    sendAllUsers,
    sendUserById,
    sendUserCreated,
    sendUserUpdated,
    sendUserDeleted
} = require('../controllers/users.js');

usersRouter.get('/users', findAllUsers, sendAllUsers);

// routes/users.js
usersRouter.post(
    "/users",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    createUser,
    sendUserCreated
  );

  usersRouter.get('/users/:id', findUserById, sendUserById);

  // Файл routes/users.js

usersRouter.put(
    "/users/:id", // Слушаем запросы по эндпоинту
    checkEmptyNameAndEmail,
    updateUser, // Обновляем запись в MongoDB
    sendUserUpdated // Возвращаем ответ на клиент
  );
  usersRouter.delete('/users/:id', deleteUser, sendUserDeleted);

module.exports = usersRouter;