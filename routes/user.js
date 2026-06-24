const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { createUserValidator, updateUserValidator } = require('../validators/user');
const validateInput = require('../validators/validateinput');

router.post(
    '/create',
    createUserValidator,
    validateInput,
    userController.createUser
);

router.get('/all', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', updateUserValidator, validateInput, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;