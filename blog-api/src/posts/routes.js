const router = require('express').Router();
const auth = require('../auth/middleware');
const { getPosts, getMyPosts, createPost } = require('./controllers');

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
 *       200:
 *         description: Successful Response
 */
router.get('/my-posts', auth, getMyPosts);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create Post
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/', auth, createPost);

module.exports = router;