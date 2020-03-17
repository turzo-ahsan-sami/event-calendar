const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router.get("/", UserController.getAllUsers);

router.post("/add", UserController.addUser);

module.exports = router;