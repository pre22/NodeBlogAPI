const Post = require('./models');

const createPost = async (req, res) => {
    try {
        const post = await Post.create({
            ...req.body, author: req.user
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}

const getPosts = async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
}

const getMyPosts = async (req, res) => {
    const posts = await Post.find({ author: req.user })
    res.json(posts);
}

module.exports = { createPost, getPosts, getMyPosts }