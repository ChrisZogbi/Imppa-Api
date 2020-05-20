import * as ComentarioController from '../controllers/ComentarioController';

export let getComentarioProfesor = async (req, res) => {
    console.log("getComentarioProfesor Route inicio");
    return( ComentarioController.getComentariosProfesor(req, res));
}

export let getComentarioAlumno = async (req, res) => {
    console.log("getComentarioAlumno Route inicio");
    return( ComentarioController.getComentarioAlumno(req, res));
}

export let getComentarioClase = async (req, res) => {
    console.log("GetComentarioClase Route inicio" + req.baseUrl);
    return( ComentarioController.getComentarioClase(req, res));
}

export let  addComentario = async (req, res) => {
    return(ComentarioController.addComentarioController(req, res));
}

export let updateComentario = async (req, res) => {
    return(ComentarioController.updateComentarioController(req, res));
}

export let deleteComentario = async (req, res) => {
    return(ComentarioController.deleteComentarioController(req, res));
} 