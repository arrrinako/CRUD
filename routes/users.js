const usersRouter = require('express').Router();




const { 
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    checkIsUserExists,
    checkEmptyNameAndEmail,
    checkEmptyNameAndEmailAndPassword,
    hashPassword,
    filterPassword,
}=require('../middlewares/users.js');

const {
    sendAllUsers,
    sendUserById,
    sendUserCreated,
    sendUserUpdated,
    sendUserDeleted,
    sendMe,
} = require('../controllers/users.js');

const { checkAuth } = require("../middlewares/auth.js");

usersRouter.get('/users', findAllUsers, sendAllUsers, filterPassword);

// routes/users.js

usersRouter.post(
    "/users",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated
  );

  usersRouter.get('/users/:id', findUserById, sendUserById, filterPassword);

  // Файл routes/users.js

  usersRouter.put(
    "/users/:id",
    checkEmptyNameAndEmail,
    checkAuth,
    updateUser,
    sendUserUpdated
  );
  usersRouter.delete(
    "/users/:id",
    checkAuth,
    deleteUser,
    sendUserDeleted
); 

usersRouter.get("/me", checkAuth, sendMe);

module.exports = usersRouter;