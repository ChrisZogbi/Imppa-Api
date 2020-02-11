import {getComentarioController, addComentarioController, updateComentarioController, deleteComentarioController} from '../controllers/ComentarioController';

export let getComentario = (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return( getComentarioController(req,res));
}

export let  addComentario = (req, res) => {
    return(addComentarioController(req, res));
}

export let updateComentario = (req, res) => {
    return(updateComentarioController(req, res));
}

export let deleteComentario = (req, res) => {
    return(deleteComentarioController(req, res));
} 