import * as ClaseController from '../controllers/ClaseController'

export async function getClaseByProfesor(req, res) {
    return(ClaseController.getClasesByProfesor(req,res));
}

export async function getClasesDistanciaFiltro(req, res) {
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

export async function habilitarClase(req, res) {
    console.log("HabilitarClase Route inicio");
    return(ClaseController.habilitarClase(req,res));
}

export async function deshabilitarClase(req, res) {
    console.log("deshabilitarClase Route inicio");
    return(ClaseController.deshabilitarClase(req,res));
}