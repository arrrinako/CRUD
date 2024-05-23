// controllers/auth.js

const users = require("../models/user.js");
const path = require("path");
const jwt = require("jsonwebtoken");
// Импорты и другие функции-контроллеры


const sendIndex = (req, res) => {
    if (req.cookies.jwt) {
      try {
        jwt.verify(req.cookies.jwt, "some-secret-key");
        return res.redirect("/admin/dashboard");
      } catch (err) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      }
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  };

const sendDashboard=(req,res)=>{
    res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
};

const login = (req, res) => {
    const { email, password } = req.body;
  
    users
      .findUserByCredentials(email, password)
      .then((user) => {
          const token = jwt.sign({ _id: user._id }, "some-secret-key", {
          expiresIn: 3600
        });
        return { user, token };
      })
      .then(({ user, token }) => {
        res
          .status(200)
          .send({
              _id: user._id, 
              username: user.username, 
              email: user.email, 
              jwt: token });
            })
            .catch(error=>{
                res.status(401).send({message:error.message});
            });

  };
  

  module.exports = { login, sendIndex, sendDashboard };
  // Не забываем экспортирвать функцию 
