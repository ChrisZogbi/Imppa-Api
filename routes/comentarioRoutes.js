import {getComentarioController, addComentarioController, updateComentarioController, deleteComentarioController} from '../controllers/ComentarioController';

export let getComentario = async (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return( getComentarioController(req,res));
}

export let  addComentario = async (req, res) => {
    return(addComentarioController(req, res));
}

export let updateComentario = async (req, res) => {
    return(updateComentarioController(req, res));
}

export let deleteComentario = async (req, res) => {
    return(deleteComentarioController(req, res));
} 