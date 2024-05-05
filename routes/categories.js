  // Создаём роут для запросов категорий 
  const categoriesRouter = require('express').Router();
  
  // Импортируем вспомогательные функции
  const {
    findAllCategories,
    createCategory,
    findCategoryById,
    updateCategory,
    deleteCategory,
    checkEmptyName,
    checkIsCategoryExists
  } = require('../middlewares/categories.js');
  const {
    sendAllCategories,
    sendCategoryById,
    sendCategoryCreated,
    sendCategoryDeleted,
    sendCategoryUpdated
  } = require('../controllers/categories.js');
  
  // Обрабатываем GET-запрос с роутом '/categories'
  categoriesRouter.get('/categories', findAllCategories, sendAllCategories);

  // routes/categories.js
  categoriesRouter.post(
    "/categories",
    findAllCategories,
    checkIsCategoryExists,
    checkEmptyName,
    createCategory,
    sendCategoryCreated
  );

  categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById);

  // Файл routes/categories.js

categoriesRouter.put(
  "/categories/:id", // Слушаем запросы по эндпоинту
  updateCategory, // Обновляем запись в MongoDB
  sendCategoryUpdated, // Возвращаем ответ на клиент
  checkEmptyName
);

categoriesRouter.delete('/categories/:id', deleteCategory, sendCategoryDeleted);

  
  // Экспортируем роут для использования в приложении — app.js
  module.exports = categoriesRouter;
  