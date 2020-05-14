import express, { response } from 'express';
import * as ComentarioService from '../services/ComentarioService';
import { LogError } from './ErrorLogController';

export function getComentariosProfesor(req, res) {
  const idProfesor = req.query.IdProfesor;
  ComentarioService.getComentariosProfesor(idProfesor)
    .then((response) => {
      if (!response.Success) { return res.status(200).json(response) }

      res.status(200).json({ Success: true, DataComentario: response.Data });
    })
    .catch((err) => {
      LogError(getComentariosProfesor.name, `Error buscar comentarios IdProfesor: ${idProfesor}. Mensaje de error: ${err.message}`);
    });
}

export function getComentarioByClase(req, res) {
  const idClaseProfesor = req.query.IdClaseProfesor;
  ComentarioService.getComentariosClase(idClaseProfesor)
    .then((response) => {
      if (!response.Success) { return res.status(200).json(response) }

      res.status(200).json({ Success: true, DataComentario: response.Data });
    })
    .catch((err) => {
      LogError(getComentarioByClase.name, `Error buscar comentarios IdClaseProfesor: ${idClaseProfesor}. Mensaje de error: ${err.message}`);
    });
}

export function getComentarioAlumno(req, res) {
  const idAlumno = req.query.IdAlumno;
  ComentarioService.getComentarioAlumno(idAlumno)
    .then((response) => {
      if (!response.Success) { return res.status(200).json(response) }

      res.status(200).json({ Success: true, DataComentario: response.Data });
    })
    .catch((err) => {
      LogError(getComentarioAlumno.name, `Error buscar comentarios idAlumno: ${idAlumno}. Mensaje de error: ${err.message}`);
    });
}

export async function addComentarioController(req, res) {
  console.log(req.body);

  ComentarioService.addComentario(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)

      if (response.Success) { res.status(200).json(response) }
      else {
        LogError(addComentarioController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateComentarioController(req, res) {
  console.log(req.body);

  ComentarioService.updateSubcripcion(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)

      if (response.Success) { res.status(200).json(response) }
      else {
        LogError(updateComentarioController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteComentarioController(req, res) {
  console.log(req.body);

  ComentarioService.deleteComentario(req).then((response) => {
    console.log("Respuesta" + response.Success)

    if (response.Success) { res.status(200).json(response) }
    else {
      LogError(deleteComentarioController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
    .catch((err) => {
      console.log(err);
    });
}