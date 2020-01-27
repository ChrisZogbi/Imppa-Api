import {getTipoUsuarioController, addTipoUsuarioController, updateTipoUsuarioController, deleteTipoUsuarioController} from '../controllers/TipoUsuarioController';

export let getTipoUsuario = async (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return(await getTipoUsuarioController(req,res));
}

export let  addTipoUsuario = (req, res) => {
    return(addTipoUsuarioController(req, res));
}

export let updateTipoUsuario = (req, res) => {
    return(updateTipoUsuarioController(req, res));
}

export let deleteTipoUsuario = (req, res) => {
    return(deleteTipoUsuarioController(req, res));
} 