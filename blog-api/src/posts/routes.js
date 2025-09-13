const router = require('express').Router();
const auth = require('../auth/middleware');
const { getPosts, getMyPosts, createPost } = require('./controllers');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post API Module
 */


/**
* @swagger
* /api/posts:
*  get:
*    summary: Get all Posts
*    tags: [Posts]
*    responses:
*      200:
*        description: Successful response
*/
router.get('/', getPosts);

/**
 * @swagger
 * /api/my-posts:
 *   get:
 *     summary: Get all Posts made by Logged in user
 *     tags: [Posts]
 *     responses:
 *       201:
 *         description: Successful Response
 */
router.get('/my-posts', auth, getMyPosts);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create Post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post Created Successfully
 *       401:
 *         description: Invalid Credentials
 */
router.post('/', auth, createPost);

module.exports = router;