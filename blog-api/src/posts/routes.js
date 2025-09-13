const router = require('express').Router();
const auth = require('../auth/middleware');
const { getPosts, getMyPosts, createPost } = require('./controllers');


router.get('/', getPosts);
router.get('/my-posts', auth, getMyPosts);
router.post('/', auth, createPost);