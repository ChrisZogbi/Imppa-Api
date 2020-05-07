import * as ClaseController from '../controllers/ClaseController'

export async function getClaseByProfesor(req, res) {
    return (ClaseController.getClasesByProfesor(req, res));
}

export async function getClasesDistanciaFiltro(req, res) {
    return (ClaseController.getClasesDistancia(req, res));
}

export async function addClase(req, res) {
    console.log("addClase Route inicio");
    return (ClaseController.addClase(req, res));
}

export async function getClaseByUbicacion(req, res) {
    console.log("GetByUbicacion Route inicio");
    return (ClaseController.getClasesByUbicacion(req, res));
}

export async function updateClase(req, res) {
    console.log("UpdateClase Route inicio");
    return (ClaseController.updateClaseController(req, res));
}

export async function deleteClase(req, res) {
    console.log("Borrar clase Route");
    return (ClaseController.deleteClase(req, res));
}
export async function habilitarClase(req, res) {
    console.log("HabilitarClase Route inicio");
    return (ClaseController.habilitarClase(req, res));
}

export async function deshabilitarClase(req, res) {
    console.log("deshabilitarClase Route inicio");
    return (ClaseController.deshabilitarClase(req, res));
}