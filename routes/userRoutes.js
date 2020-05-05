import { getUsersController, getUserByID, addUserController, updateUserController, 
         deleteUserController, loginUserController, updateContraseniaController } from '../controllers/UserController';
import {checkToken} from '../auth/token_validation'

export async function getUsers(req, res) {
    return(getUsersController(req,res));
}

export async function getUser(req, res)
{
    console.log('Llego a getUserByID')
    return(getUserByID(req, res))
}

export async function addUser(req, res) {
    return(addUserController(req, res));
}

export async function updateUser(req, res) {
    return(updateUserController(req, res));
}

export async function deleteUser(req, res) {
    return(deleteUserController(req, res));
}

export async function loginUser(req, res) {
    console.log("Llego");
    return(loginUserController(req, res));
}

export async function cambiarContrasenia(req, res) {
    console.log("Llego");
    return(updateContraseniaController(req, res));
}
