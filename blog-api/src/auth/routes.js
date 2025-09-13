const router = require('express').Router();
const { register, login } = require('./controllers');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API Module
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registrations
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Successful Response
 *       404:
 *         description: User not found
 *       401:
 *         description: Invalid Credentials
 */
router.post('/login', login);

module.exports = router;
