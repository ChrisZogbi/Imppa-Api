import express, { response } from 'express';
import { LogError } from './ErrorLogController';
import { getTipoUsuarioByIdUsuarioService, getTipoUsuarioService, deleteTipoUsuarioService, updateTipoUsuarioService, addTipoUsuarioService } from '../services/TipoUsuarioService';

export function getTipoUsuarioController(req, res) {
  getTipoUsuarioService(req)
    .then((response) => {
      if (response.Success) { res.status(200).json(response) }
      else {
        LogError(getTipoUsuarioController.name, response.Data.message)
        res.status(500).json(response);
      }

    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getTipoUsuarioByIdUsuario(idUsuario) {
  return await getTipoUsuarioByIdUsuarioService(idUsuario)
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function addTipoUsuarioController(req, res) {
  console.log(req.body);

  addTipoUsuarioService(req.body.Tipo)
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