import * as AuthController from '../controllers/AuthController';

export async function token(req, res) {
    return (AuthController.obtenerTokenNuevo(req, res));
}

export async function loginUser(req, res) {
    return (AuthController.loginUser(req, res));
}

export async function loginGoogle(req, res) {
    return (AuthController.googleAuth(req, res));
}

export async function cambiarContrasenia(req, res) {
    return (AuthController.cambiarContrasenia(req, res));
}

export async function traerRefreshtoken(req, res) {
    return (AuthController.traerRefreshtoken(req, res));
}