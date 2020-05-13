import * as AdminController from '../controllers/AdminController';

export let getAllUsers = async (req, res) => {
    return (AdminController.getAllUsers(req, res));
}

export let getTipoUsuario = async (req, res) => {
    return (AdminController.getAllTipoUsuario(req, res));
}

export let addTipoUsuario = async (req, res) => {
    return (AdminController.addTipoUsuario(req, res));
}

export let updateTipoUsuario = async (req, res) => {
    return (AdminController.updateTipoUsuario(req, res));
}

export let deleteTipoUsuario = async (req, res) => {
    return (AdminController.deleteTipoUsuario(req, res));
}

export let getCategoriaClase = async (req, res) => {
    return (AdminController.getAllCategoriaClase(req, res));
}

export let addCategoriaClase = async (req, res) => {
    return (AdminController.addCategoriaClase(req, res));
}

export let updateCategoriaClase = async (req, res) => {
    return (AdminController.updateCategoriaClase(req, res));
}

export let deleteCategoriaClase = async (req, res) => {
    return (AdminController.deleteCategoriaClase(req, res));
} 

export let getAllSubscripciones = async (req, res) => {
    return (AdminController.getAllSubscripcion(req,res));
}

export let  addSubscripcion = async (req, res) => {
    return(AdminController.addSubscripcion(req, res));
}

export let updateSubscripcion = async (req, res) => {
    return(AdminController.updateSubscripcion(req, res));
}

export let deleteSubscripcion = async (req, res) => {
    return(AdminController.deleteSubscripcion(req, res));
} 