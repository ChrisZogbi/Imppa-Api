import { LogError } from './ErrorLogController';
import * as Auth from '../auth/token_validation';
import * as TokenService from '../services/RefreshTokenService'
import { response } from 'express';
import * as UserService from '../services/UserService';
import { compareSync } from 'bcryptjs';
import * as UserController from './UserController'
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport';

export function googleAuth(req, res) {
    const UserReq = req.body;

    UserService.getByIdGoogle(UserReq.idGoogle)
        .then((response) => {
            //Si devuelve true es que el usuario existe hace el login.
            if (response.Success) {
                UserController.TraerDatosUsuario(response.Data[0].ID, response.Data[0].TipoUsuario)
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

export async function loginUser(req, res) {
    let passIngresada = req.body.Contrasenia;

    UserService.getByMail(req.body.Mail)
        .then((response) => {
            if (response.Success) {
                const result = compareSync(passIngresada, response.Data.Contrasenia);

                if (result) {
                    UserController.TraerDatosUsuario(response.Data.ID, response.Data.TipoUsuario)
                        .then((usuarioData) => {

                            response.Data.Contrasenia = undefined;
                            Promise.all([Auth.generateUserToken(response.Data), Auth.generateRefreshToken(response.Data)])
                                .then((results) => {
                                    let jToken = results[0];
                                    let jRToken = results[1];
                                    if (!jToken.Success || !jRToken.Success) { return res.status(200).json({ Success: false, Data: { Message: `Error al generar los tokens`, Token: jToken.Data, RefreshToken: jRToken.Data } }) }
                                    let Usuario = {
                                        Success: true,
                                        Token: jToken.Token,
                                        RefreshToken: jRToken.RefreshToken,
                                        DataUsuario: response.Data,
                                        DataTipoUsuario: usuarioData.DataTipoUsuario,
                                        DataSubcripcion: usuarioData.DataSubcripcion
                                    }

                                    if (usuarioData.DataClasesProfesor) {
                                        Usuario.DataClasesProfesor = usuarioData.DataClasesProfesor;
                                    }

                                    console.log(Usuario);

                                    return res.status(200).json(Usuario);
                                })
                                .catch((err) => {
                                    console.log(err);
                                    LogError('generateUserToken', err);
                                    return res.status(200).json({ Success: true, Message: "Error en generateUserToken", Data: err.message });
                                })
                        })
                }
                else {
                    return res.status(200).json({
                        Success: true,
                        Message: "Email y contrasenia no coinciden",
                        Data: []
                    });
                }
            }
            else {
                return res.status(200).json({
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

export async function obtenerTokenNuevo(req, res) {
    let refreshToken = req.body.RefreshToken;
    let idUsuario = req.body.IdUsuario;
    console.log(refreshToken);

    TokenService.existeRefreshToken(idUsuario, refreshToken)
        .then((response) => {
            if (!response.Success) { return res.status(401).json({ Success: false, Data: 'El RefreshToken enviado no existe en nuestros registros.' }) }

            Auth.generateUserToken(response.Data)
                .then((token) => {
                    if (!token.Success) { return res.status(401).json({ Success: false, Data: `Error al generar el token nuevo. RefreshToken enviado: ${refreshToken}` }) }
                    return res.status(200).json({ Success: true, Token: token.Token });
                });
        })
        .catch((err) => {
            return res.status(401).json({ Success: false, Data: `Ocurrio un error al intentar obtener un Token nuevo. RefreshToken enviado: ${refreshToken}` });
        });

}

export function cambiarContrasenia(req, res) {
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

export function traerRefreshtoken(req, res) {
    console.log(req.body);
    TokenService.traerRefreshToken(req.body.RefreshToken)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { return res.status(200).json(response.Data) }
            else {
                LogError(traerRefreshtoken.name, response.Data.message)
                return res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
