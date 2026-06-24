const { body } = require('express-validator');

const createUserValidator = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('name')
        .notEmpty().withMessage('Name is required'),

    body('mobileNumber')
        .notEmpty().withMessage('Mobile number is required')
        .isMobilePhone().withMessage('Please provide a valid mobile number'),

    body('roleId')
        .notEmpty().withMessage('Role ID is required')
        .isMongoId().withMessage('Please provide a valid role ID'),
];

const updateUserValidator = [
    body('email')
        .optional()
        .isEmail().withMessage('Please provide a valid email'),

    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('name')
        .optional()
        .notEmpty().withMessage('Name is required'),

    body('mobileNumber')
        .optional()
        .isMobilePhone().withMessage('Please provide a valid mobile number'),

    body('roleId')
        .optional()
        .isMongoId().withMessage('Please provide a valid role ID'),
];

module.exports = {
    createUserValidator,
    updateUserValidator,
};