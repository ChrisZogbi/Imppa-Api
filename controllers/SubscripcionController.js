import express, { response } from 'express';
import * as SubscripcionService from '../services/SubscripcionService';
import { LogError } from './ErrorLogController';

export function getSubscipcionController(req, res) {

  console.log('lala' + req.baseUrl);
  if (req.query.Id) {
    SubscripcionService.getSubcripcionByIdService(req)
      .then((response) => {
        console.log("Respuesta" + response.Success)

        if (response.Success) { res.status(200).json(response) }
        else {
          LogError(getSubscipcionController.name, response.Data.message)
          res.status(500).json(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    SubscripcionService.getSubcripcionService(req)
      .then((response) => {
        console.log("Respuesta" + response.Success)

        if (response.Success) { res.status(200).json(response) }
        else {
          LogError(getSubscipcionController.name, response.Data.message)
          res.status(500).json(response);
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export async function getSubcripcionByIdProfesor(idProfesor) {
  return await SubscripcionService.getSubcripcionByIdProfesor(idProfesor)
    .then((response) => {
      console.log(response);
      return response
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function addSubscipcionController(req, res) {
  console.log(req.body);

  SubscripcionService.addSubcripcionService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)

      if (response.Success) { res.status(200).json(response) }
      else {
        LogError(addSubscipcionController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateSubscipcionController(req, res) {
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
    });
}

export function deleteSubscipcionController(req, res) {
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