import { LogError } from './ErrorLogController';
import { getAllTipoUsuarioService, deleteTipoUsuarioService, updateTipoUsuarioService, addTipoUsuarioService } from '../services/TipoUsuarioService';
import express, { response } from 'express';
import { getCategoriaClaseService, getCategoriaClaseByNombreCategoriaService, addCategoriaClaseService, updateCategoriaClaseService, deleteCategoriaClaseService }
    from '../services/CategoriaClaseService';
import * as UserService from '../services/UserService'
import { getTipoUsuario } from '../routes/adminRoutes';
import * as SubscripcionService from '../services/SubscripcionService';

const _ = require("lodash");

export async function getAllUsers(req, res) {
    UserService.getAll()
        .then((response) => {
            return res.json(response.Data);
        })
        .catch((err) => {
            res.status(500).json({ Success: false, Data: `Error en getAllUsers. Message: ${err.message}` });
            console.log(err);
        });
}

/* #region Subscripcion */

export async function getAllSubscripcion(req, res) {
    try {
        let response = await SubscripcionService.getAllSubcripcion();
        if (response.Success) { return res.status(200).json(response) }
        else {
            LogError(getAllSubscripcion.name, response.Data.message);
            return res.status(400).json({ Success: false, error: response.error});
        }
    }
    catch (error) {
        return res.status(500).json({ Success: false, error: `Error en ${getAllSubscripcion.name}. Message: ${error.message}`});
    }
}

export async function addSubscripcion(req, res) {
    console.log(req.body);

    SubscripcionService.addSubcripcionService(req.body)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(addSubscripcion.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(response);
        });
}

export function updateSubscripcion(req, res) {
    console.log(req.body);

    SubscripcionService.updateSubcripcionService(req)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(updateSubscipcionController.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(response);
        });
}

export function deleteSubscripcion(req, res) {
    console.log(req.body);

    SubscripcionService.deleteSubcripcionService(req).then((response) => {
        console.log("Respuesta" + response.Success)

        if (response.Success) { res.status(200).json(response) }
        else {
            LogError(deleteSubscipcionController.name, response.Data.message)
            res.status(500).json(response);
        }
    })
        .catch((err) => {
            console.log(err);
        });
}

/* #endregion */

/* #region CategoriaClase */

export async function getAllCategoriaClase(req, res) {
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

export async function addCategoriaClase(req, res) {
    console.log(req.body);

    addCategoriaClaseService(req.body.NombreCategoria)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(addCategoriaClase.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function updateCategoriaClase(req, res) {
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

export async function deleteCategoriaClase(req, res) {
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
            res.status(500).json(response);
        });
}

/* #endregion */

/* #region TipoUsuario */

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

export async function addTipoUsuario(req, res) {
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

export function updateTipoUsuario(req, res) {
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

export function deleteTipoUsuario(req, res) {
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

/* #endregion */