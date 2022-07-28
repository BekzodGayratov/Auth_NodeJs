const Users = require('../models/user_model');

var getUsers = async (req, res) => {
    let users = await Users.find({}, (err, data) => {
        if (err) {
            res.json({
                "status": false,
                "data": {},
                "message": "Users not found"
            });
        } else {
            res.json({
                "status": true,
                "data": data,
                "message": "Users found successfully",
            });
        }
    });
};

module.exports = getUsers;