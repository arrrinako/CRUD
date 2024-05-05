const sendAllCategories = (req, res) => {
    // Установим заголовок ответа в формате JSON
  res.setHeader('Content-Type', 'application/json');
  // Отправим данные в виде JSON-объекта, 
  // которые подготовим в миддлваре findAllCategories
  res.end(JSON.stringify(req.categoriesArray));
};

const sendCategoryById= (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

// controllers/categories.js
const sendCategoryCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

const sendCategoryUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end("Category updated");
};

const sendCategoryDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

// Экспортируем контроллер
module.exports = {
  sendAllCategories,
  sendCategoryById,
  sendCategoryCreated,
  sendCategoryUpdated,
  sendCategoryDeleted,

};
