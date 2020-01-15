var TipoUsuarioController = require('../controllers/TipoUsuarioController');

exports.getTipoUsuario = (req, res) => {
    console.log("GetUsers Route inicio");
    return(TipoUsuarioController.getTipoUsuario(req,res));
}

exports.addTipoUsuario = (req, res) => {
    return(TipoUsuarioController.addTipoUsuario(req, res));
}

exports.updateTipoUsuario = (req, res) => {
    return(TipoUsuarioController.updateTipoUsuario(req, res));
}

exports.deleteTipoUsuario = (req, res) => {
    return(TipoUsuarioController.deleteTipoUsuario(req, res));
}