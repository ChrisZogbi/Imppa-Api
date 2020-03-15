import express from 'express';
import {
  getUserByMail, getUserByMailContraseniaService, getUserService, getUsersService, addUserService,
  updateUserService, deleteUserService, updateContraseniaService
} from '../services/UserService';
import * as TipoUsuarioController from './TipoUsuarioController';
import { LogError } from './ErrorLogController';
import { getSubcripcionByIdProfesor, addUserSubcripcion } from './SubscripcionController'

const ObtenerTipoUsuario = async (idUsuario) => {
  return new Promise((resolve, reject) => {
    resolve(TipoUsuarioController.getTipoUsuarioByIdUsuario(idUsuario));
  })
    .then((result) => {
      console.log("Respuesta de la promise: " + result);
      return (result)
    });
};

const ObtenerSubcripcionDelUsuario = async (id) => {
  return new Promise((resolve, reject) => {
    resolve(getSubcripcionByIdProfesor(id));
  })
    .then((result) => {
      console.log("Respuesta de la promise: " + result);
      return (result)
    });
};

const AgregarUserSubcripcion = async (idUsuario, idSubscripcion) => {
  return new Promise((resolve, reject) => {
    resolve(addUserSubcripcion(idUsuario, idSubscripcion));
  })
    .then((result) => {
      console.log("Respuesta de la promise: " + result);
      return (result)
    });
};

export async function getUsersController(req, res) {

  console.log(req.body);

  getUsersService()
    .then((response) => {
      console.log("Respuesta" + response.Success)

      if (response.Success) { res.status(200).json(response) }
      else {
        LogError(getUsersController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getUserByID(req, res) {
  let id = req.query.Id

  Promise.all([getUserService(id), ObtenerTipoUsuario(id), ObtenerSubcripcionDelUsuario(id)])
    .then((results) => {
      let resultUsuario = results[0];
      let resultTipoUsuario = results[1];
      let resultSubcripcion = results[2];

      if (resultUsuario.Success && resultTipoUsuario.Success && resultSubcripcion.Success) {
        console.log("Todo OK")
        res.status(200).json({
          Success: true,
          DataUsuario: resultUsuario.Data,
          DataTipoUsuario: resultTipoUsuario.Data,
          DataSubcripcion: resultSubcripcion.Data
        });
      }
      else {
        let errorUsuario;
        let errorTipoUsuario;
        let errorSubcripcion;
        console.log("Error");

        if (!resultUsuario.Success) {
          errorUsuario = resultUsuario.Data.message;
          LogError(getUserByID.name, resultUsuario.Data.message);
        }

        if (!resultTipoUsuario.Success) {
          errorTipoUsuario = resultTipoUsuario.Data.message;
          LogError("Consulta TipoUsuario", resultTipoUsuario.Data.message);
        }

        if (!resultSubcripcion.Success) {
          errorSubcripcion = resultSubcripcion.Data.message;
          LogError("Consulta Subcripcion", resultSubcripcion.Data.message);
        }

        res.status(500).json({
          ErrorUsuario: errorUsuario,
          ErrorTipoUsuario: errorTipoUsuario,
          ErrorSubcripcion: errorSubcripcion
        });
      }
    })
    .catch((err) => {
      LogError(getUserByID.name, err)
      console.log(err)
    });
}

export async function addUserController(req, res) {
  console.log(req.body);
  const idSubscripcion = req.body.IdSubscripcion
  const idTipoUsuario = req.body.TipoUsuario

  getUserByMail(req.body.Mail)
    .then((response) => {

      console.log("Existe usuario con mismo mail: " + response.Success)
      console.log(response);

      if (!response.Success) {
        addUserService(req)
          .then((responseAdd) => {
            console.log("Respuesta" + responseAdd.Success)
            if (responseAdd.Success) {
              console.log("Id Usuario Insetado: " + responseAdd.InsertId)
              if(idSubscripcion){
                AgregarUserSubcripcion(responseAdd.InsertId, idSubscripcion)
                  .then((responseSubscripcion) => {
                    if (responseSubscripcion.Success) {
                      res.status(200).json(responseAdd);
                    }
                    else {
                      LogError(addUserController.name, responseSubscripcion.Data.message)
                      res.status(500).json(responseSubscripcion);
                    }
                  });
              }
              else{
                res.status(200).json(responseAdd);
              }
            }
            else {
              LogError(addUserController.name, responseAdd.Data.message)
              res.status(500).json(responseAdd);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        LogError(addUserController.name, response.Data.message)
        res.status(500).json(response.Data.message);
      }
    })
}

export function updateUserController(req, res) {
  console.log(req.body);
  updateUserService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)

      if (response.Success) { res.status(200).json(response) }
      else {
        LogError(updateUserController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateContraseniaController(req, res) {
  console.log(req.body);
  updateContraseniaService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)

      if (response.Success) { res.status(200).json(response) }
      else {
        LogError(updateContraseniaController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteUserController(req, res) {
  console.log(req.body);
  deleteUserService(req)
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

export function loginUserController(req, res) {
  console.log(req.body);
  getUserByMailContraseniaService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)

      if (response.Success) { res.status(200).json(response) }
      else {
        LogError(loginUserController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
      LogError(loginUserController.name, response.Data.message)
    });
}