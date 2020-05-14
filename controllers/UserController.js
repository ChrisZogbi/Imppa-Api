import express from 'express';
import * as UserService from '../services/UserService';
import { getTipoUsuarioByIdUsuarioService } from '../services/TipoUsuarioService';
import { LogError } from './ErrorLogController';
import * as SubscripcionService from '../services/SubscripcionService'
import * as ClaseProfesorService from '../services/ClaseProfesorService'
import { compareSync } from 'bcryptjs';
import { ETipoUsuario } from '../enum'
import * as Auth from '../auth/token_validation'
import { NText } from 'mssql';


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
    resolve(addUserSubcripcion(idUsuario, idSubscripcion));
  })
    .then((result) => {
      return (result)
    });
};

const TraerDatosUsuario = async (idUsuario, idTipoUsuario) => {
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

  UserService.getByMail(req.body.Mail)
    .then((response) => {

      console.log("Existe usuario con mismo mail: " + response.Success)
      console.log(response);

      if (!response.Success) {
        UserService.add(req.body)
          .then((responseAdd) => {
            console.log("Respuesta" + responseAdd.Success)
            if (responseAdd.Success && responseAdd.InsertId) {
              if (idTipoUsuario === ETipoUsuario.Profesor) {
                AgregarUserSubcripcion(responseAdd.InsertId, idSubscripcion)
                  .then((responseSubscripcion) => {
                    if (!responseSubscripcion.Success) {
                      LogError(addUserController.name, responseSubscripcion.Data.message)
                      res.status(500).json(responseSubscripcion);
                    }
                  });
              }
            }
            else {
              LogError(addUserController.name, responseAdd.Data.message)
              res.status(500).json(responseAdd);
            }

            let idUsuarioInsertado = { query: { Id: responseAdd.InsertId, needToken: true } }
            getUserByID(idUsuarioInsertado, res)
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

export async function loginUserController(req, res) {
  let passIngresada = req.body.Contrasenia;

  UserService.getByMail(req.body.Mail)
    .then((response) => {
      if (response.Success) {
        const result = compareSync(passIngresada, response.Data.Contrasenia);

        if (result) {
          TraerDatosUsuario(response.Data.ID, response.Data.TipoUsuario)
            .then((usuarioData) => {

              response.Data.Contrasenia = undefined;

              Auth.generateUserToken(response.Data)
                .then((jToken) => {
                  let Usuario = {
                    Success: true,
                    Token: jToken,
                    DataUsuario: response.Data,
                    DataTipoUsuario: usuarioData.DataTipoUsuario,
                    DataSubcripcion: usuarioData.DataSubcripcion
                  }

                  if (usuarioData.DataClasesProfesor) {
                    Usuario.DataClasesProfesor = usuarioData.DataClasesProfesor;
                  }

                  console.log(Usuario);

                  res.status(200).json(Usuario);
                })
                .catch((err) => {
                  console.log(err);
                  LogError('generateUserToken', err);
                  res.status(200).json({ Success: true, Message: "Error en generateUserToken", Data: err.message });
                })
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