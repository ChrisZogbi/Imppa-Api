import {getCategoriaClaseController, addCategoriaClaseController, updateCategoriaClaseController, deleteCategoriaClaseController} from '../controllers/CategoriaClaseController';

export let getCategoriaClase = (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return( getCategoriaClaseController(req,res));
}

export let  addCategoriaClase = (req, res) => {
    return(addCategoriaClaseController(req, res));
}

export let updateCategoriaClase = (req, res) => {
    return(updateCategoriaClaseController(req, res));
}

export let deleteCategoriaClase = (req, res) => {
    return(deleteCategoriaClaseController(req, res));
} 