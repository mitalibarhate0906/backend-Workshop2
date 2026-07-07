const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const { createUserValidator, updateUserValidator } = require("../validators/user");
const validateInput = require("../validators/validateinput");

const { checkAuth } = require("../middleware/checkauth");
const checkPermission = require("../middleware/checkpermission");

// Login (Public Route)
router.post("/login", userController.login);

// Create User
router.post(
  "/create",
  checkAuth,
  checkPermission("create_user"),
  createUserValidator,
  validateInput,
  userController.createUser
);

// Get All Users
router.get(
  "/all",
  checkAuth,
  checkPermission("view_users"),
  userController.getUsers
);

// Get User By ID
router.get(
  "/:id",
  checkAuth,
  checkPermission("view_users"),
  userController.getUserById
);

// Update User
router.put(
  "/:id",
  checkAuth,
  checkPermission("update_user"),
  updateUserValidator,
  validateInput,
  userController.updateUser
);

// Delete User
router.delete(
  "/:id",
  checkAuth,
  checkPermission("delete_user"),
  userController.deleteUser
);

module.exports = router;