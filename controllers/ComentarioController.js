import express, { response } from 'express';
import * as ComentarioService from '../services/ComentarioService';
import { LogError } from './ErrorLogController';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';

const _ = require("lodash");

const ObtenerObjetoComentario = async (Data) => {
  return new Promise((resolve, reject) => {
    let objetoComentario = [];
    _.forEach(Data, (value) => {
      objetoComentario.push({
        IdComentario: value.IdComentario,
        ComentarioData: { Comentario: value.Comentario, Puntaje: value.Puntaje },
        ProfesorData: { Id: value.IdProfesor, Nombre: value.NombreProfesor, Apellido: value.ApellidoProfesor, Foto: '' },
        AlumnoData: { Id: value.IdAlumno, Nombre: value.NombreAlumno, Foto: '' },
        ClaseData: { Id: value.IdClaseProfesor, Categoria: value.CategoriaClase, Tipo: value.TipoClase, Foto: '' }
      });
    })
    resolve(objetoComentario);
  })
    .then((result) => {
      return (result)
    });
};

export function getComentariosProfesor(req, res) {
  const idProfesor = req.params.IdProfesor;
  console.log('Id profesor enviado ' + idProfesor);
  ComentarioService.getComentariosProfesor(idProfesor)
    .then((response) => {
      if (!response.Success) { return res.status(200).json(response) }
      ObtenerObjetoComentario(response.Data).
        then((result) => {
          res.status(200).json({ Success: true, Comentarios: result });
        });
    })
    .catch((err) => {
      res.status(200).json({ Success: false, Data: `Error buscar comentarios IdProfesor: ${idProfesor}. Mensaje de error: ${err.message}` });
      LogError(getComentariosProfesor.name, `Error buscar comentarios IdProfesor: ${idProfesor}. Mensaje de error: ${err.message}`);
    });
}

export function getComentarioClase(req, res) {
  const idClaseProfesor = req.params.IdClaseProfesor;
  ComentarioService.getComentariosClase(idClaseProfesor)
    .then((response) => {
      if (!response.Success) { return res.status(200).json(response) }

      ObtenerObjetoComentario(response.Data).
        then((result) => {
          res.status(200).json({ Success: true, Comentarios: result });
        });
    })
    .catch((err) => {
      LogError(getComentarioClase.name, `Error buscar comentarios IdClaseProfesor: ${idClaseProfesor}. Mensaje de error: ${err.message}`);
      res.status(200).json({ Success: false, Data: `Error buscar comentarios IdClaseProfesor: ${idClaseProfesor}. Mensaje de error: ${err.message}` });
    });
}

export function getComentarioAlumno(req, res) {
  const idAlumno = req.params.IdAlumno;
  ComentarioService.getComentarioAlumno(idAlumno)
    .then((response) => {
      if (!response.Success) { return res.status(200).json(response) }

      ObtenerObjetoComentario(response.Data).
        then((result) => {
          res.status(200).json({ Success: true, Comentarios: result });
        });
    })
    .catch((err) => {
      LogError(getComentarioAlumno.name, `Error buscar comentarios idAlumno: ${idAlumno}. Mensaje de error: ${err.message}`);
      res.status(200).json({ Success: false, Data: `Error buscar comentarios idAlumno: ${idAlumno}. Mensaje de error: ${err.message}` });
    });
}

export async function addComentarioController(req, res) {
  console.log(req.body);

  ComentarioService.addComentario(req.body)
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