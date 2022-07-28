const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/authenticate_controller');
const getUsers = require('../controllers/get_users_controller');

// TO REGISTER NEW USERS
router.post('/register', registerUser.register);

// TO LOGIN USERS
router.post('/login', registerUser.login);

// TO GET ALL USERS
router.get('/get_users',getUsers);


module.exports = router;
