import { getUsersController, addUserController, updateUserController, deleteUserController, loginUserController } from '../controllers/UserController';

export async function getUsers(req, res) {
    console.log("GetUsers Route inicio");
    return(getUsersController(req,res));
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