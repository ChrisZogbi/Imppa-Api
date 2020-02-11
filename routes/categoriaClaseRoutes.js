import {getCategoriaClaseController, addCategoriaClaseController, updateCategoriaClaseController, deleteCategoriaClaseController} from '../controllers/CategoriaClaseController';

export let getCategoriaClase = async (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return( getCategoriaClaseController(req,res));
}

export let  addCategoriaClase = async (req, res) => {
    return(addCategoriaClaseController(req, res));
}

export let updateCategoriaClase = async (req, res) => {
    return(updateCategoriaClaseController(req, res));
}

export let deleteCategoriaClase = async (req, res) => {
    return(deleteCategoriaClaseController(req, res));
} 