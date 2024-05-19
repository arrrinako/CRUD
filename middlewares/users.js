// Файл middlewares/users.js

// Импортируем модель
const users = require('../models/user');
// middlewares/users.js

const bcrypt = require("bcryptjs"); // Импортируем bcrypt

// middlewares/users.js

const hashPassword = async (req, res, next) => {
  try {
    // Создаём случайную строку длиной в десять символов
    const salt = await bcrypt.genSalt(10);
    // Хешируем пароль
    const hash = await bcrypt.hash(req.body.password, salt);
    // Полученный в запросе пароль подменяем на хеш
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};
 
 

 

const findAllUsers = async (req, res, next) => {
  console.log("GET/api/users");
  req.usersArray = await users.find({}, {password:0});
  next();
}
// middlewares/users.js
// const createUser = async (req, res, next) => {
//   console.log("POST /users");
//   try {
//     console.log(req.body);
//     req.user = await users.create(req.body);
//     next();
//   } catch (error) {
//     res.status(400).send("Error creating user");
//   }
// };

const createUser = async (req, res, next) => {
  console.log("PUT/api/users");
  try {
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Ошибка при создании пользователя");
  }
};

const updateUser=async(req, res, next)=>{
  console.log("PUT/api/users/:id");
  try{
    req.user=await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  }catch(error){
    res.status(400).send({message:"Error updating user"});
  }
};

const deleteUser=async(req, res, next)=>{
  console.log("DELETE/api/users/:id");
  try{
    req.user=await users.findByIdAndDelete(req.params.id);
    next();
  }catch(error){
    res.status(400).send({message:"Error deleting user"});
  }
};

// middlewares/users.js
const findUserById = async (req, res, next) => {
  console.log("GET /api/users/:id");
  try {
    req.user = await users.findById(req.params.id, {password:0});
    next();
  } catch (error) {
    res.status(404).send({ message: "User not found" });
  }
};

const checkEmptyNameAndEmail=async(req, res, next)=>{
  if(!req.body.username || !req.body.email){
    res.status(400).send({message:"Введите имя и email "});
  }else{
    next();
  }
};

const checkEmptyNameAndEmailAndPassword=async(req, res, next)=>{
  if(!req.body.username || !req.body.email ||!req.body.password){
    res.status(400).send({message:"Введите имя, email и пароль"});
  }else{
    next();
  }
};

const checkIsUserExists=async(req, res, next)=>{
  const isInArray = req.usersArray.find((user)=>{
    return req.body.email===user.email;
  });
  if (isInArray){
    res.status(400).send({message:"Пользователь с таким email уже существует"});
  }else{
    next();
  }
};

const filterPassword=(req, res, next)=>{
  const filterUser = (user)=>{
    const{password, ...userWithoutPassword}=user.toObject();
    return userWithoutPassword;
  };
  if(req.usersArray){
    req.usersArray = req.usersArray.map((user)=>filterUser(user));
  }
  if(req.user){
    req.user=filterUser(req.user);
  }
  next();
};

// Экспортируем функцию поиска всех пользователей
module.exports ={
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  filterPassword,
  deleteUser,
  hashPassword,
  checkIsUserExists,
  checkEmptyNameAndEmail,
  checkEmptyNameAndEmailAndPassword,
} ;

