import { LogError } from './ErrorLogController';
import { getAllTipoUsuarioService, deleteTipoUsuarioService, updateTipoUsuarioService, addTipoUsuarioService } from '../services/TipoUsuarioService';
import express, { response } from 'express';
import { getCategoriaClaseService, getCategoriaClaseByNombreCategoriaService, addCategoriaClaseService, updateCategoriaClaseService, deleteCategoriaClaseService }
    from '../services/CategoriaClaseService';
import * as UserService from '../services/UserService'
import { getTipoUsuario } from '../routes/adminRoutes';

const _ = require("lodash");

export async function getAllUsers(req, res) {

    console.log(req.body);

    UserService.getAll()
        .then((response) => {

            if (response.Success) {
                let Usuarios = response.Data;
                _.forEach(Usuarios, (value) => {
                    value.TipoUsuario = {
                        IdTipoUsuario: value.TipoUsuario,
                        TUsuario: value.Tipo
                    }
                    value.Tipo = undefined;
                });

                res.status(200).json({
                    Success: true,
                    Data: Usuarios
                });
            }
            else {
                LogError(getUsersController.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            res.status(500).json({ Success: false, Data: `Error en getAllUsers. Message: ${err.message}` });
            console.log(err);
        });
}

export async function getCategoriaClaseController(req, res) {

    console.log('lala' + req.baseUrl);
    if (req.query.NombreCategoria) {
        getCategoriaClaseByNombreCategoriaService(req)
            .then((response) => {
                console.log("Respuesta" + response.Success)

                if (response.Success) { res.status(200).json(response) }
                else {
                    LogError(getCategoriaClaseController.name, response.Data.message)
                    res.status(500).json(response);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        getCategoriaClaseService(req)
            .then((response) => {
                console.log("Respuesta" + response.Success)

                if (response.Success) { res.status(200).json(response) }
                else {
                    LogError(getCategoriaClaseController.name, response.Data.message)
                    res.status(500).json(response);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export async function addCategoriaClaseController(req, res) {
    console.log(req.body);

    addCategoriaClaseService(req)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(addCategoriaClaseController.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function updateCategoriaClaseController(req, res) {
    console.log(req.body);

    updateCategoriaClaseService(req)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(updateCategoriaClaseController.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function deleteCategoriaClaseController(req, res) {
    console.log(req.body);

    deleteCategoriaClaseService(req)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(deleteCategoriaClaseController.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function getAllTipoUsuario(req, res) {
    getAllTipoUsuarioService()
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(getAllTipoUsuario.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function addTipoUsuarioController(req, res) {
    console.log(req.body);

    addTipoUsuarioService(req)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(addTipoUsuarioController.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export function updateTipoUsuarioController(req, res) {
    console.log(req.body);

    updateTipoUsuarioService(req)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(updateTipoUsuarioController.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export function deleteTipoUsuarioController(req, res) {
    console.log(req.body);

    deleteTipoUsuarioService(req).then((response) => {
        console.log("Respuesta" + response.Success)

        if (response.Success) { res.status(200).json(response) }
        else {
            LogError(deleteTipoUsuarioController.name, response.Data.message)
            res.status(500).json(response);
        }
    })
        .catch((err) => {
            console.log(err);
        });
}