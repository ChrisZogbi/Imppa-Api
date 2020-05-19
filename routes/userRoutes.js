import {
    getUsersController, getUserByID, addUserController, updateUserController,
    deleteUserController, updateContraseniaController, googleAuth
} from '../controllers/UserController';

export async function getUsers(req, res) {
    return (getUsersController(req, res));
}

export async function getUser(req, res) {
    return (getUserByID(req, res))
}

export async function addUser(req, res) {
    return (addUserController(req, res));
}

export async function updateUser(req, res) {
    return (updateUserController(req, res));
}

export async function deleteUser(req, res) {
    return (deleteUserController(req, res));
}


