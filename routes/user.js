const express = require('express');
const router = express.Router();
const users = require('../users')

router.get('/api/v1/users', (req, res) => { 
    res.json(users);
});

router.post('/api/v1/user/signup', (req, res) =>{
    const newUser = {
        _id: req.body._id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser)
    res.status(201).json({message: "User created succesfully"});
});

router.post('/api/v1/user/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(u => u.username === username && u.password === password)
    
    if(user) {
        res.status(200).send({message: 'Login Succesful'})
    } else {
        res.status(401).send({message: 'Invalid Credentials'})
    }
})

module.exports = router;