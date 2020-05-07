import {
    getUsersController, getUserByID, addUserController, updateUserController,
    deleteUserController, loginUserController, updateContraseniaController, googleAuth
} from '../controllers/UserController';
import { checkToken } from '../auth/token_validation'

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

export async function loginUser(req, res) {
    return (loginUserController(req, res));
}

export async function loginGoogle(req, res) {
    return (googleAuth(req, res));
}

export async function cambiarContrasenia(req, res) {
    return (updateContraseniaController(req, res));
}
