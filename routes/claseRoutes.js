import * as ClaseController from '../controllers/ClaseController'

export async function getClaseByProfesor(req, res) {
    // console.log("getClaseByProfesor Route inicio");
    return(ClaseController.getClasesByProfesor(req,res));
}

export async function getClaseByFilter(req, res) {
    console.log("getClaseByFilter Route inicio");
    return(ClaseController.getClasesByFilter(req,res));
}

export async function addClase(req, res) {
    console.log("addClase Route inicio");
    return(ClaseController.addClase(req,res));
}

export async function getClaseByUbicacion(req, res) {
    console.log("GetByUbicacion Route inicio");
    return(ClaseController.getClasesByUbicacion(req,res));
}