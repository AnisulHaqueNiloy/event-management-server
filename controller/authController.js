const User = require('../model/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
    const { name, email, password, photoURL } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, photoURL });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
    const { name, email, password, photoURL } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, photoURL });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
