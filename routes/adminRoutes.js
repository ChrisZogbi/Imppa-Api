import * as AdminController from '../controllers/AdminController';

export let getAllUsers = async (req, res) => {
    return (AdminController.getAllUsers(req, res));
}

export let getTipoUsuario = async (req, res) => {
    return (AdminController.getAllTipoUsuario(req, res));
}

export let addTipoUsuario = async (req, res) => {
    return (AdminController.addTipoUsuarioController(req, res));
}

export let updateTipoUsuario = async (req, res) => {
    return (AdminController.updateTipoUsuarioController(req, res));
}

export let deleteTipoUsuario = async (req, res) => {
    return (AdminController.deleteTipoUsuarioController(req, res));
}

export let getCategoriaClase = async (req, res) => {
    return (AdminController.getCategoriaClaseController(req, res));
}

export let addCategoriaClase = async (req, res) => {
    return (AdminController.addCategoriaClaseController(req, res));
}

export let updateCategoriaClase = async (req, res) => {
    return (AdminController.updateCategoriaClaseController(req, res));
}

export let deleteCategoriaClase = async (req, res) => {
    return (AdminController.deleteCategoriaClaseController(req, res));
} 