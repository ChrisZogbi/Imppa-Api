import express, { response } from 'express';
import * as ClaseProfesorService from '../services/ClaseProfesorService';
import * as ClaseXUsuarioService from '../services/ClaseXUsuarioService';
import { LogError } from './ErrorLogController';

const _ = require("lodash");


const AgregarClaseXUsuario = async (idUsuario, idClase) => {
    return new Promise((resolve, reject) => {
        resolve(ClaseXUsuarioService.addClaseXUsuarioService(idUsuario, idClase));
    })
        .then((result) => {
            console.log("Respuesta de la promise: " + result);
            return (result)
        });
}

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
    ClaseProfesorService.getClaseByIdUsuarioService(req.query.IdProfesor)
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

export function getClasesDistancia(req, res) {
    console.log('Llego al controller man');
    ClaseProfesorService.getClaseDistancia(req.body)
        .then(response => {
            let ClasesDistancia = [];
            if (response.Success) {
                _.forEach(response.Data, (value) => {
                    ClasesDistancia.push(
                        {
                            DataClase: {
                                IdClaseProfesor: value.IdClaseProfesor,
                                CategoriaClase: {ID: value.IdCategoriaClase, Nombre: value.NombreCategoria},
                                IDTipoClase: value.IDTipoClase,
                                Precio: value.Precio,
                                Lunes: value.Lunes,
                                Martes: value.Martes,
                                Miercoles: value.Miercoles,
                                Jueves: value.Jueves,
                                Viernes: value.Viernes,
                                Sabado: value.Sabado,
                                Domingo: value.Domingo
                            },
                            DataProfesor: {
                                IdProfesor: value.IdProfesor,
                                Nombre: value.Nombre,
                                Apellido: value.Apellido,
                                Telefono: value.Telefono
                            }
                        }
                    );
                });
                res.status(200).json({ Success: true, Data: ClasesDistancia })
            }
            else {
                LogError(getClasesDistancia.name, response.Data.message);
                console.log(response.Data);
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            LogError(getClasesDistancia.name, err);
            console.log(err);
        });
}

export function getClasesByUbicacion(req, res) {
    ClaseProfesorService.getClaseByUbicacion(req)
        .then(response => {
            let ClaseUbicacion = [];
            if (response.Success) {
                _.forEach(response.Data, (value) => {
                    ClaseUbicacion.push(
                        {
                            DataClase: {
                                IdClaseProfesor: value.IdClaseProfesor,
                                CategoriaClase: {ID: value.IdCategoriaClase, Nombre: value.NombreCategoria},
                                IDTipoClase: value.IDTipoClase,
                                Precio: value.Precio,
                                Latitud: value.Latitud,
                                Longitud: value.Longitud,
                                Lunes: value.Lunes,
                                Martes: value.Martes,
                                Miercoles: value.Miercoles,
                                Jueves: value.Jueves,
                                Viernes: value.Viernes,
                                Sabado: value.Sabado,
                                Domingo: value.Domingo
                            },
                            DataProfesor: {
                                IdProfesor: value.IdProfesor,
                                Nombre: value.Nombre,
                                Apellido: value.Apellido,
                                Telefono: value.Telefono
                            }
                        }
                    );
                });
                res.status(200).json({ Success: true, Data: ClaseUbicacion })
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
                            res.status(200).json(responseClasexUsuario);
                        }

                    });
            }
            else {
                LogError(addClase.name, response.Data.message);
                res.status(200).json(response);
            }
        })
        .catch((err) => {
            LogError(addClase.name, err.message);
            console.log(err);
        });
}

export function updateClaseController(req, res) {
    let errorMessage;
    ClaseProfesorService.updateClase(req.body)
        .then(response => {
            console.log("Volvio del caos");
            if (response.Success) {
                res.status(200).json({ Success: true, Data: 'Se actualizo correctamente la clase.' });
            }
            else {
                errorMessage = `Error al intentar actualizar ClaseProfesor. ID: ${req.body.IdClase}` + response.Data;
                LogError(updateClaseController.name, errorMessage);
                console.log(errorMessage);
                res.status(200).json({ Success: false, Data: errorMessage })
            }
        })
        .catch((err) => {
            LogError(updateClaseController.name, err.message);
            console.log(err);
        });
}

export async function deleteClase(req, res) {
    let errorMessage;
    Promise.all([ClaseXUsuarioService.deleteClaseXUsuarioService(req.body.IdUsuario, req.body.IdClaseProfesor), ClaseProfesorService.deleteDiasXClase(req.body.IdClaseProfesor)])
        .then((results) => {
            let resultClaseXUsuario = results[0];
            let resultDiasXClase = results[1];
            console.log("Paso las 2 promises");
            if (resultClaseXUsuario.Success && resultDiasXClase.Success) {
                ClaseProfesorService.deleteClaseProfesorService(req.body.IdClaseProfesor)
                    .then((response) => {
                        if (response.Success) {
                            res.status(200).json({ Success: true, affectedRowss: response.RowsAfectadas, Data: 'Se ha eliminado la clase correctamente.' })
                        }
                    })
                    .catch((err) => {
                        errorMessage = `Error al intentar borrar ClaseProfesor. ID: ${req.body.IdClaseProfesor}` + err.message;
                        LogError(deleteClase.name, errorMessage);
                        console.log(errorMessage);
                        res.status(200).json({ Success: false, Data: errorMessage })
                    });
            }
            else {
                errorMessage = 'Error al intentar borrar los dias y/o la ClaseXUsuario ' + resultClaseXUsuario.Data ? resultClaseXUsuario.Data : resultDiasXClase.Data;
                LogError(deleteClase.name, errorMessage);
                console.log(errorMessage);
                res.status(200).json({ Success: false, Data: errorMessage })
            }
        })
        .catch((err) => {
            errorMessage = 'Error al intentar borrar los dias y/o la ClaseXUsuario ' + err.message;
            LogError(deleteClase.name, errorMessage);
            console.log(errorMessage);
            res.status(200).json({ Success: false, Data: errorMessage })
        });
}

export async function habilitarClase(req, res) {
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

export async function deshabilitarClase(req, res) {
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