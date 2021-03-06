import express from 'express';
import * as UserService from '../services/UserService';
import { getTipoUsuarioByIdUsuarioService } from '../services/TipoUsuarioService';
import { LogError } from './ErrorLogController';
import * as SubscripcionService from '../services/SubscripcionService'
import * as ClaseProfesorService from '../services/ClaseProfesorService'
import { ETipoUsuario } from '../enum'


const ObtenerTipoUsuario = async (idUsuario) => {
  return new Promise((resolve, reject) => {
    resolve(getTipoUsuarioByIdUsuarioService(idUsuario));
  })
    .then((result) => {
      return (result)
    });
};

const ObtenerSubcripcionDelUsuario = async (idProfesor) => {
  return new Promise((resolve, reject) => {
    resolve(SubscripcionService.getSubcripcionByIdProfesor(idProfesor));
  })
    .then((result) => {
      return (result)
    });
};

const AgregarUserSubcripcion = async (idUsuario, idSubscripcion) => {
  return new Promise((resolve, reject) => {
    console
    resolve(SubscripcionService.addUserSubcripcion(idUsuario, idSubscripcion));
  })
    .then((result) => {
      return (result)
    });
};

export const TraerDatosUsuario = async (idUsuario, idTipoUsuario) => {
  return Promise.all([ObtenerTipoUsuario(idUsuario), ObtenerSubcripcionDelUsuario(idUsuario), ClaseProfesorService.getClaseByIdUsuarioService(idUsuario)])
    .then((results) => {
      let resultTipoUsuario = results[0];
      let resultSubcripcion = results[1];
      let resultClaseProfesor = results[2];

      let UsuarioDatos = {
        Success: true,
        DataTipoUsuario: resultTipoUsuario.Data,
        DataSubcripcion: resultSubcripcion.Data
      }

      if (idTipoUsuario === ETipoUsuario.Profesor) {
        UsuarioDatos.DataClasesProfesor = resultClaseProfesor.Data;
      }

      return UsuarioDatos;
    })
};

export async function getUserByID(req, res) {
  const id = req.query.Id;
  console.log("Id Usuario: " + req.query.id)

  UserService.getById(id)
    .then((response) => {

      if (response.Success) {
        TraerDatosUsuario(id, response.Data[0].TipoUsuario)
          .then((usuarioData) => {
            if (usuarioData.Success) {
              response.Data[0].Contrasenia = undefined;
              let Usuario = {
                Success: true,
                DataUsuario: response.Data,
                DataTipoUsuario: usuarioData.DataTipoUsuario,
                DataSubcripcion: usuarioData.DataSubcripcion
              }

              if (usuarioData.DataClasesProfesor) {
                Usuario.DataClasesProfesor = usuarioData.DataClasesProfesor;
              }

              res.status(200).json(Usuario);
            }
            else {
              res.status(200).json({
                Success: false,
                Message: "Ha ocurrido un error en getUserById",
                Data: err.message
              });
            }

          });
      }
    })
    .catch((err) => {
      LogError(getUserByID.name, err)
      console.log(err);
      res.status(200).json({
        Success: false,
        Message: "Ha ocurrido un error",
        Data: err.message
      });
    });
}

export async function addUserController(req, res) {
  const idSubscripcion = req.body.IdSubscripcion;
  const idTipoUsuario = req.body.TipoUsuario;

  let response = await UserService.getByMail(req.body.Mail);

  if (response.Success) {
    LogError(addUserController.name, response.Data.message)
    return res.status(400).json({ Success: true, error: "Ya existe un usuario registrado con el mismo Mail" });
  }

  let responseAdd = await UserService.add(req.body);

  console.log("agrego bien");
  if (!responseAdd.Success || !responseAdd.InsertId) {
    LogError(addUserController.name, responseAdd.Data.message)
    return res.status(400).json({ Success: false, error: `Ocurrio un error al agregar el usuario. Error ${responseAdd.Data.message} ` });
  }

  console.log(ETipoUsuario.Profesor);
  if (idTipoUsuario == ETipoUsuario.Profesor) {
      console.log("Se agrega subcripcion");
      let responseSubscripcion = await AgregarUserSubcripcion(responseAdd.InsertId, idSubscripcion);

      if (!responseSubscripcion.Success) {
        LogError(addUserController.name, responseSubscripcion.Data.message)
        return res.status(400).json({ Success: false, error: `Ocurrio un error al agregar el usuario. Error ${responseAdd.Data.message} ` });
      }
  }

  let idUsuarioInsertado = { query: { Id: responseAdd.InsertId } };
  return getUserByID(idUsuarioInsertado, res);
}

export function updateUserController(req, res) {
  console.log(req.body);
  UserService.update(req.body)
    .then((response) => {
      console.log("Respuesta" + response.Success)

      if (response.Success) { res.status(200).json({ Success: true, Data: `Se actualizo correctamente el usuario ${req.body.Mail}` }) }
      else {
        LogError(updateUserController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}



export function deleteUserController(req, res) {
  console.log(req.body);
  UserService.remove(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)

      if (response.Success) { res.status(200).json(response) }
      else {
        LogError(deleteUserController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
      LogError(deleteUserController.name, response.Data.message)
    });
}