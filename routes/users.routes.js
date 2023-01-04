const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userModel = require('../models/users.model');

//Sign up
router.post('/signup',[
    check('username', 'Please enter a valid Username')
    .not()
    .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        username, email, password
    } = req.body;
    try {
       let user = await userModel.findOne({
        email
       });
       if (user) {
            return res.status(400).json({
                msg: 'User already exists!'
            });
       } 

       user = new userModel({ username, email, password});

       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);

       await user.save();

       const payload = {
            user: {
                id: user.id
            }
       };

       jwt.sign(payload,
        'randomString', {
            expiresIn: 10000
        },
        (err, token) => {
            if(err) throw err;
            res.status(200).json({
                token: token
            });
        }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error in saving!");
    }
})

//Login
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
        min: 6
    })
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({
            email
        });
        if(!user) {
            return res.status(400).json({
                msg: 'User not exist!'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                msg: 'Incorrect password!'
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'randomString',
            {
                expiresIn: 3600
            },
            (err, token) => {
                if(err) throw err;
                res.status(200).json({
                    token: token
                })
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server Error'
        })
    }
})
module.exports = router;