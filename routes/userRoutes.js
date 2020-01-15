var UserController = require('../controllers/UserController');

exports.getUsers = (req, res) => {
    console.log("GetUsers Route inicio");
    return(UserController.getUsers(req,res));
}

exports.addUser = (req, res) => {
    return(UserController.addUser(req, res));
}

exports.updateUser = (req, res) => {
    return(UserController.updateUser(req, res));
}

exports.deleteUser = (req, res) => {
    return(UserController.deleteUser(req, res));
}

exports.loginUser = (req, res) => {
    console.log("Llego");
    return(UserController.loginUser(req, res));
}