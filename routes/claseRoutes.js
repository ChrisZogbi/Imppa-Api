import * as ClaseController from '../controllers/ClaseController'

export async function getClaseByProfesor(req, res) {
    console.log("getClaseByProfesor Route inicio");
    return(ClaseController.getClasesByProfesor(req,res));
}