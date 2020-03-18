import * as ClaseController from '../controllers/ClaseController'

export async function getClaseByProfesor(req, res) {
    console.log("getClaseByProfesor Route inicio");
    return(ClaseController.getClasesByProfesor(req,res));
}

export async function addClase(req, res) {
    console.log("addClase Route inicio");
    return(ClaseController.addClase(req,res));
}