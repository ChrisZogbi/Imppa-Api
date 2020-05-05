import express from 'express';
import * as UserService from '../services/UserService';
import * as TipoUsuarioController from './TipoUsuarioController';
import { LogError } from './ErrorLogController';
import { getSubcripcionByIdProfesor, addUserSubcripcion } from './SubscripcionController'
import * as ClaseProfesorService from '../services/ClaseProfesorService'
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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

const TraerDatosUsuario = async (idUsuario, idTipoUsuario) => {
  return Promise.all([ObtenerTipoUsuario(idUsuario), ObtenerSubcripcionDelUsuario(idUsuario), ClaseProfesorService.getClaseByIdUsuarioService(idUsuario)])
    .then((results) => {
      let resultTipoUsuario = results[0];
      let resultSubcripcion = results[1];
      let resultClaseProfesor = results[2];

      let UsuarioDatos = {
        Success: true,
        //DataUsuario: response.Data,
        DataTipoUsuario: resultTipoUsuario.Data,
        DataSubcripcion: resultSubcripcion.Data
      }

      if (idTipoUsuario == 3) {
        UsuarioDatos.DataClasesProfesor = resultClaseProfesor.Data;
      }

      return UsuarioDatos;
    })
}

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

export async function getUserByID(req, res) {
  const id = req.query.Id;

  UserService.getById(id) 
    .then((response) => {

      if (response.Success) {
        TraerDatosUsuario(id, response.Data[0].TipoUsuario)
          .then((usuarioData) => {
            if(usuarioData.Success) {
            response.Data[0].Contrasenia = undefined;
            const jToken = sign({ result: response }, 'campeon1986', { expiresIn: "12h" })
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
          }
          else{
            res.status(200).json({
              Success: false,
              Message: "Ha ocurrido un error en getById",
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
              console.log("Id Usuario Insetado: " + responseAdd.InsertId)
              if (idTipoUsuario === 3) {
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

export async function loginUserController(req, res) {
  let passIngresada = req.body.Contrasenia;

  UserService.getByMail(req.body.Mail)
    .then((response) => {
      if (response.Success) {
        console.log(`${passIngresada}    ${response.Data.Contrasenia}`)
        const result = compareSync(passIngresada, response.Data.Contrasenia, () => { });

        if (result) {
          TraerDatosUsuario(response.Data.ID, response.Data.TipoUsuario)
            .then((usuarioData) => {

              response.Data.Contrasenia = undefined;
              const jToken = sign({ result: response }, 'campeon1986', { expiresIn: "12h" })
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