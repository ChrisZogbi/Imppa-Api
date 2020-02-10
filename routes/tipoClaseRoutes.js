import {getTipoClaseController, addTipoClaseController, updateTipoClaseController, deleteTipoClaseController} from '../controllers/TipoClaseController';

export let getTipoClase = async (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return(await getTipoClaseController(req,res));
}

export let  addTipoClase = (req, res) => {
    return(addTipoClaseController(req, res));
}

export let updateTipoClase = (req, res) => {
    return(updateTipoClaseController(req, res));
}

export let deleteTipoClase = (req, res) => {
    return(deleteTipoUsuarioController(req, res));
} 