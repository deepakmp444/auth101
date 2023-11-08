const router = require('express');
const { getAllUser, loginUser, createUser, logoutUser } = require('../controller/authController');
const isLoggin = require('../middleware/isLoggin');
const route = router.Router();


route.get("/alluser", isLoggin, getAllUser);
route.post("/login", loginUser);
route.post("/create-user", createUser);
route.get("/logout", logoutUser);

module.exports = route