import {getTipoUsuario, addTipoUsuario, updateTipoUsuario, deleteTipoUsuario} from '../controllers/TipoUsuarioController';

exports.getTipoUsuario = (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return(getTipoUsuario(req,res));
}

exports.addTipoUsuario = (req, res) => {
    return(addTipoUsuario(req, res));
}

exports.updateTipoUsuario = (req, res) => {
    return(updateTipoUsuario(req, res));
}

exports.deleteTipoUsuario = (req, res) => {
    return(deleteTipoUsuario(req, res));
}