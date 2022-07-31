const Users = require('../models/user_model');

var getUsers = async (req, res) => {
    try {
        let users = await Users.find({});
        console.log(users);

        if (users) {
            res.json({
                "status": true,
                "data": users,
                "message": "Users found successfully"
            });
        } else {
            res.json({
                "status": false,
                "data": {},
                "message": "Users not found"
            });
        }
    } catch (e) {
        res.json({
            "error": e
        });
    }
};

module.exports = getUsers;