const mongoose = require('mongoose')
const User = require('../models/user')
const request = require('request')

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];  // Assuming 'Bearer <token>'
    if (!token) {
        return res.status(401).send('Token missing');
    }

    try {
        const decoded = jwt.verify(token, '123$#%12D'); 
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send('User not found');
        }
        
        res.send({ message: 'Login successful', user });
    } catch (error) {
        res.status(401).send('Invalid token');
    }
};
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

  
module.exports = {login,createUser};
