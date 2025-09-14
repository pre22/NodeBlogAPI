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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
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
