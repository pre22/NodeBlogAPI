const User = require('../users/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const register_schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const login_schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})


const register = async (req, res) => {
    const { error } = register_schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            username, email, password: hashed
        });

        res.status(201).json({
            message: 'User registered',
            user
        })
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
};

const login = async (req, res) => {
    const { error } = login_schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ 'message': 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid Credentials' });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        res.json({ token })
        
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}


module.exports = { register, login }