import express from 'express';
import * as UserService from '../services/UserService';
import * as TipoUsuarioController from './TipoUsuarioController';
import { LogError } from './ErrorLogController';
import { getSubcripcionByIdProfesor, addUserSubcripcion } from './SubscripcionController'
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../auth/passportConfiguration'
import { ETipoUsuario } from '../enum'

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

const generateUserToken = async (UserObject) => {
  return new Promise((resolve, reject) => {
    resolve(sign({ result: UserObject }, JWT_SECRET, { expiresIn: "1h" }));
  })
    .then((result) => {
      console.log("Respuesta de la promise: " + result);
      return (result)
    });
};

export async function getUsersController(req, res) {

  console.log(req.body);

  UserService.getAll()
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

export async function getUserByID(id, res) {
  Promise.all([UserService.getById(id), ObtenerTipoUsuario(id), ObtenerSubcripcionDelUsuario(id)])
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
  const idSubscripcion = req.body.IdSubscripcion
  const idTipoUsuario = req.body.TipoUsuario

  UserService.getByMail(req.body.Mail)
    .then((response) => {

      console.log("Existe usuario con mismo mail: " + response.Success)
      console.log(response);

      if (!response.Success) {
        UserService.add(req.body)
          .then((responseAdd) => {
            console.log("Respuesta" + responseAdd.Success)
            if (responseAdd.Success) {
              console.log("Id Usuario Insertado: " + responseAdd.InsertId)
              if (idTipoUsuario === ETipoUsuario.Profesor) {
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
              else {
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
        res.status(200).json({ Success: true, Message: "Ya existe un usuario registrado con el mismo Mail", Data: [] });
      }
    })
}

export function updateUserController(req, res) {
  console.log(req.body);
  UserService.update(req)
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

export function loginUserController(req, res) {
  let passIngresada = req.body.Contrasenia;

  UserService.getByMail(req.body.Mail)
    .then((response) => {
      if (response.Success) {
        const result = compareSync(passIngresada, response.Data.Contrasenia);

        if (result) {
          Promise.all([ObtenerTipoUsuario(response.IdUsuario), ObtenerSubcripcionDelUsuario(response.IdUsuario)])
            .then((results) => {
              let resultTipoUsuario = results[0];
              let resultSubcripcion = results[1];

              response.Data.Contrasenia = undefined;
              generateUserToken(response)
                .then((jToken) => {
                  res.status(200).json(
                    {
                      Success: true,
                      Token: jToken,
                      DataUsuario: response.Data,
                      DataTipoUsuario: resultTipoUsuario.Data,
                      DataSubcripcion: resultSubcripcion.Data
                    }
                  );
                })
                .catch((err) => {
                  console.log(err);
                  LogError('generateUserToken', err);
                });
            })
        }
        else {
          res.status(200).json({
            Success: true,
            Message: "Email y contrasenia no coinciden",
            Data: []
          });
        }
      }
      else {
        res.status(200).json({
          Success: true,
          Message: "Email o contraseña incorrectos",
          Data: []
        });
      }
    })
    .catch((err) => {
      console.log(err);
      LogError(loginUserController.name, response.Data.message)
    });
}

export function googleAuth(UserG, req, res) {
  const UserReq = req.body;

  UserService.getByIdGoogle(user.idGoogle)
    .then((response) => {
      //Si devuelve true es que el usuario existe hace el login.
      if (response.Success) {
        Promise.all([ObtenerTipoUsuario(response.IdUsuario), ObtenerSubcripcionDelUsuario(response.IdUsuario)])
          .then((results) => {
            let resultTipoUsuario = results[0];
            let resultSubcripcion = results[1];
            generateUserToken(response)
              .then((jToken) => {
                res.status(200).json(
                  {
                    Success: true,
                    Token: jToken,
                    DataUsuario: response.Data,
                    DataTipoUsuario: resultTipoUsuario.Data,
                    DataSubcripcion: resultSubcripcion.Data
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
          idGoogle = UserG.idGoogle,
          TipoUsuario: UserReq.TipoUsuario,
          Mail: UserG.Mail,
          Nombre: UserG.Nombre,
          Apellido: UserG.Apellido,
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
                AgregarUserSubcripcion(responseAdd.InsertId, UserData.idSubscripcion)
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

          });
      }
    })
    .catch((err) => {
      console.log(err);
      LogError(googleAuth.name, response.Data.message)
    });
}