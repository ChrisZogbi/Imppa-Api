import {getTipoClaseController, addTipoClaseController, updateTipoClaseController, deleteTipoClaseController} from '../controllers/TipoClaseController';

export let getTipoClase = async (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return(await getTipoClaseController(req,res));
}

export let  addTipoClase = async (req, res) => {
    return(addTipoClaseController(req, res));
}

export let updateTipoClase = async (req, res) => {
    return(updateTipoClaseController(req, res));
}

export let deleteTipoClase = async (req, res) => {
    return(deleteTipoClaseController(req, res));
} 