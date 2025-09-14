const Joi = require('joi');
const Post = require('./models');


const post_schemas = Joi.object({
    title: Joi.string().min(6).required(),
    body: Joi.string().min(10).required(),
})

const createPost = async (req, res) => {
    const { error } = post_schemas.validate(req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'title or body cannot be empty' });
    }

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

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