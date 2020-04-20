import express, { response } from 'express';
import * as ClaseProfesorService from '../services/ClaseProfesorService';
import * as ClaseXUsuarioService from '../services/ClaseXUsuarioService';
import { LogError } from './ErrorLogController';

const AgregarClaseXUsuario = async (idUsuario, idClase) => {
    return new Promise((resolve, reject) => {
        resolve(ClaseXUsuarioService.addClaseXUsuarioService(idUsuario, idClase));
    })
        .then((result) => {
            console.log("Respuesta de la promise: " + result);
            return (result)
        });
};

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
    console.log('Llego al controller man');
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

export async function addClase(req, res) {
    ClaseProfesorService.addClaseProfesorService(req)
        .then(response => {
            if (response.Success) {
                AgregarClaseXUsuario(req.body.IdUsuario, response.InsertID)
                    .then(responseClasexUsuario => {
                        if (responseClasexUsuario.Success) {
                            res.status(200).json({
                                Success: true,
                                Data: 'Se agrego la clase exitosamente Id clase: ' + response.InsertID
                            });
                        }
                        else {
                            LogError(addClase.name, responseClasexUsuario.Data.message);
                            console.log("Error en Clase X Usuario");
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

export function habilitarClase(req, res)
{
    ClaseProfesorService.HabilitarClase(req)
    .then(response => {
        if (response.Success) {
            res.status(200).json(response)
        }
        else {
            LogError(getClasesByID.name, response.Data.message);
            console.log(response.Data);
            res.status(500).json(response.Data);
        }
    })
    .catch((err) => {
        LogError(habilitarClase.name, err.message);
        console.log(err);
    });
}

export function deshabilitarClase(req, res)
{
    ClaseProfesorService.DeshabilitarClase(req)
    .then(response => {
        if (response.Success) {
            res.status(200).json(response)
        }
        else {
            LogError(getClasesByID.name, response.Data.message);
            console.log(response.Data);
            res.status(500).json(response.Data);
        }
    })
    .catch((err) => {
        LogError(deshabilitarClase.name, err.message);
        console.log(err);
    });
}