const Users = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { token } = require('morgan');
const { json } = require('express');

// NEW USER REGISTER CONTROLLER
var register = async (req, res, next) => {
    try {
        const { display_name, user_name, phone_number, details } = req.body;
        if (!(display_name && user_name && phone_number && details)) {
            res.status(400).send({
                "status": false,
                "message": "All input is required"
            });

        }

        const oldUser = await Users.findOne({ phone_number });

        if (oldUser) {
            return res.status(200).json({
                "status": false,
                "isRegistered": true,
                "message": "User already exist. Please login"
            });
        }

        // CREATE TOKEN
        const generatedToken = jwt.sign({ user: Users.phone_number }, process.env.SECRET_KEY, { expiresIn: "6m" });


        //CREATE USER IN OUR DATABASE
        const user = Users.create({
            display_name: display_name,
            user_name: user_name,
            phone_number: phone_number,
            details: details,
            access_token: generatedToken
        });
        (await user).save((err, data) => {
            if (err) {
                res, json(err);
            } else {
                res.json({
                    "status": true,
                    "data": data,
                    "message": "Successfully registered"
                });
            }
        });
    } catch (e) {
        res.json(e);
    }
};

// LOGIN USERS CONTROLLER
var login = async (req, res, next) => {
    try {
        const { phone_number } = req.body;

        // Validate user input
        if (!(phone_number)) {
            res.status(400).send({
                "status": false,
                "message": "All input is required"
            });
        }
        // VALIDATE IF USER EXIST IN OUT DATABASE

        const user = await Users.findOne({ phone_number });

        if (user) {
            // CREATE TOKEN 
            const generatedToken = jwt.sign({ user: Users.phone_number }, process.env.SECRET_KEY, { expiresIn: "6m" });

            user.access_token = generatedToken;
            user.save((err, data) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json({
                        "status": true,
                        "isRegistered": true,
                        "data": data,
                        "message": "Successfully signed in"
                    });
                }
            });
        } else {
            res.status(201).json({
                "status": true,
                "isRegistered": false,
                "message": "Please Sign Up"
            });
        }
    } catch (e) { }
}

module.exports = {
    register,
    login,
}

