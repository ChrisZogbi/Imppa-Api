import express from 'express';
import * as UserService from '../services/UserService';
import { LogError } from './ErrorLogController';
import * as SubscripcionService from '../services/SubscripcionService'
import { compareSync } from 'bcryptjs';
import { ETipoUsuario } from '../enum'
import * as Auth from '../auth/token_validation'

const AgregarUserSubcripcion = async (idUsuario, idSubscripcion) => {
  return new Promise((resolve, reject) => {
    resolve(SubscripcionService.addUserSubcripcion(idUsuario, idSubscripcion));
  })
    .then((result) => { return (result) });
};

export async function getUserByID(req, res) {
  const id = req.query.Id;

  UserService.getById(id)
    .then((response) => {
      if (!response.Success) { return response.status(400).json({ Success: false, error: `Ocurrio un error al buscar el usuario id: ${id}. Error ${response.error} ` }); }
      return res.status(200).json(({ Success: true, data: response.data }));
    })
    .catch((err) => {
      return res.status(500).json({ Success: false, Message: "Ha ocurrido un error", Data: err.message });
    });
}

export async function addUserController(req, res) {
  let existe = await UserService.existeUsuarioMail(req.body.Mail);
  if (existe) { return res.status(400).json({ Success: true, error: "Ya existe un usuario registrado con el mismo Mail" }); }

  let responseAdd = await UserService.addUser(req.body);
  if (!responseAdd.Success) { return res.status(400).json({ Success: false, error: `Ocurrio un error al agregar el usuario. Error ${responseAdd.err} ` }); }

  return res.json(responseAdd);
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

export function updateContraseniaController(req, res) {
  console.log(req.body);
  UserService.updateContrasenia(req)
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

export function googleAuth(req, res) {
  const UserReq = req.body;

  UserService.getByIdGoogle(UserReq.idGoogle)
    .then((response) => {
      //Si devuelve true es que el usuario existe hace el login.
      if (response.Success) {
        TraerDatosUsuario(response.Data[0].ID, response.Data[0].TipoUsuario)
          .then((usuarioData) => {
            Auth.generateUserToken(response.Data[0])
              .then((jToken) => {
                res.status(200).json(
                  {
                    Success: true,
                    Token: jToken,
                    DataUsuario: response.Data,
                    DataTipoUsuario: usuarioData.DataTipoUsuario,
                    DataSubcripcion: usuarioData.DataSubcripcion
                  }
                );
              })
              .catch((err) => {
                console.log(err);
                LogError('generateUserToken', err);
              });
          })
      }
      //Sino lo crea
      else {
        let UserData = {
          idGoogle: UserReq.idGoogle,
          TipoUsuario: UserReq.TipoUsuario,
          Mail: UserReq.Mail,
          Nombre: UserReq.Nombre,
          Apellido: UserReq.Apellido,
          Telefono1: UserReq.Telefono1,
          Telefono2: UserReq.Telefono2,
          Habilitado: "true",
          IdSubscripcion: UserReq.IdSubscripcion
        }

        UserService.addGoogleUser(UserData)
          .then((responseAdd) => {
            console.log("Respuesta" + responseAdd.Success)
            if (responseAdd.Success) {
              console.log("Id Usuario Insertado: " + responseAdd.InsertId)
              if (UserData.TipoUsuario === ETipoUsuario.Profesor) {
                console.log("Entro a la subscripcion: " + responseAdd.InsertId)
                AgregarUserSubcripcion(responseAdd.InsertId, UserData.IdSubscripcion)
                  .then((responseSubscripcion) => {
                    if (responseSubscripcion.Success) {
                      res.status(200).json(responseAdd);
                    }
                    else {
                      LogError(googleAuth.name, responseSubscripcion.Data.message)
                      res.status(500).json(responseSubscripcion);
                    }
                  });
              }
              else {
                res.status(200).json(responseAdd);
              }
            }
            else {
              LogError(googleAuth.name, responseAdd.Data.message)
              res.status(500).json(responseAdd);
            }
          })
          .catch((err) => {
            res.status(200).json({ Success: true, Message: "Ya existe un usuario registrado con el mismo Mail", Data: err.message });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      LogError(googleAuth.name, response.Data.message)
    });
}