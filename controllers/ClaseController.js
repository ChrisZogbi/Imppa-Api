import express, { response } from 'express';
import * as ClaseProfesorService from '../services/ClaseProfesorService';
import * as ClaseXUsuarioService from '../services/ClaseXUsuarioService';
import { LogError } from './ErrorLogController';

export function getClasesByID(req) {
    ClaseProfesorService.getClaseByIDService(req, res)
        .then(response => {
            if (response.Success) {
                res.status(200).json(response)
            }
            else {
                LogError(getClasesByID.name, response.Data.message);
                console.log(err);
            }
        })
        .catch((err) => {
            LogError(getClasesByID.name, err.message);
            console.log(err);
        });
}

export function getClasesByProfesor(req, res) {
    console.log('Llego a claseController');
    ClaseProfesorService.getClaseByIdUsuarioService(req)
        .then(response => {
            if (response.Success) {
                res.status(200).json(response)
            }
            else {
                LogError(getClasesByProfesor.name, response.Data.message);
                console.log(response.Data);
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            LogError(getClasesByProfesor.name, err);
            console.log(err);
        });
}

export function getClasesByFilter(req, res) {
    ClaseProfesorService.getClaseByFilter(req)
        .then(response => {
            if (response.Success) {
                res.status(200).json(response)
            }
            else {
                LogError(getClasesByFilter.name, response.Data.message);
                console.log(response.Data);
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            LogError(getClasesByFilter.name, err);
            console.log(err);
        });
}

export function getClasesByUbicacion(req, res) {
    ClaseProfesorService.getClaseByUbicacion(req)
        .then(response => {
            if (response.Success) {
                res.status(200).json(response)
            }
            else {
                LogError(getClasesByUbicacion.name, response.Data.message);
                console.log(response.Data);
                res.status(500).json(response);
            }
        }).catch((err) => {
            LogError(getClasesByFilter.name, err);
            console.log(err);
        });
}

export function getClasesByFiltros(req, res) {

}

export async function addClase(req, res) {
    console.log("llego a add clase");
    ClaseProfesorService.addClaseProfesorService(req)
        .then(response => {
            if (response.Success) {
                //Tengo que agregar que al mismo tiempo guarde la clase por dia y la clase por hora.
                ClaseXUsuarioService.addClaseXUsuarioService(req.body.IdUsuario, response.InsertID)
                    .then(responseClasexUsuario => {
                        if (responseClasexUsuario.Success) {
                            res.status(200).json({
                                Success: true,
                                Data: 'Se agrego la clase exitosamente Id clase: ' + response.InsertID
                            });
                        }
                        else {
                            LogError(addClase.name, responseClasexUsuario.Data.message);
                            res.status(500).json(responseClasexUsuario);
                        }

                    });
            }
            else {
                LogError(addClase.name, response.Data.message);
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            LogError(addClase.name, err.message);
            console.log(err);
        });
}

export function updateClaseController(req, res) {
    ClaseProfesorService.updateClaseProfesorService(req)
        .then(response => {
            if (response.Success) {
                res.status(200).json(response);
            }
            else {
                LogError(updateClaseController.name, response.Data.message);
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            LogError(updateClaseController.name, err.message);
            console.log(err);
        });
}

export function deleteClase(req, res) {
    ClaseProfesorService.deleteClaseProfesorService(req)
        .then(response => {
            if (response.Success) {
                ClaseXUsuarioService.deleteClaseXUsuarioService()
                    .then(responseClasexUsuario => {
                        if (responseClasexUsuario.Success) {
                            res.status(200).json(responseClasexUsuario);
                        }
                        else {
                            LogError(updateClaseController.name, responseClasexUsuario.Data.message);
                            res.status(500).json(responseClasexUsuario);
                        }
                    });

                res.status(200).json(responseClasexUsuario);
            }
            else {
                LogError(addClase.name, responseClasexUsuario.Data.message);
                res.status(500).json(responseClasexUsuario);
            }
        })
        .catch((err) => {
            LogError(getClasesByProfesor.name, err.message);
            console.log(err);
        });
}