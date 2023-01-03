const express = require('express');
const router = express.Router();
const userModel = require('../models/users.model');

//Add a user
router.post('/user/add', (req, res) => {
    const user = new userModel({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const userToSave = user.save();
        res.status(200).json(userToSave);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

//Get all users
router.get('/user/getall', async (req, res) => {
    try {
        const users = await userModel.find();
        if(users.length == 0) {
            res.json({
                message: 'Cannot find any users!',
            });
        } else {
            res.json(users);
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Get a user by id 
router.get('/user/findone/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Update a user by id
router.patch('/user/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;
        const options = {
            new: true
        };

        const userUpdated = await userModel.findByIdAndUpdate(userId , updatedUserData, options);
        res.send(userUpdated);
    } catch (error) {
        res.status(400).json({
            message: 'Cannot find this user!',
        })
    }
})

//Delete a user by id 
router.delete('/user/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userDeleted = await userModel.findByIdAndDelete(userId);
        res.send(`User name ${userDeleted.name} has been deleted!`);
    } catch (error) {
        res.status(400).json({
            message: 'Cannot find this user!'
        })
    }
})

module.exports = router;