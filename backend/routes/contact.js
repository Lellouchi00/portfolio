const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { sendContactEmail } = require('../controllers/contactController');

const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters')
];

router.post('/', validateContact, sendContactEmail);

module.exports = router;
