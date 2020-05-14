import { LogError } from './ErrorLogController';
import * as Auth from '../auth/token_validation';
import * as TokenService from '../services/RefreshTokenService'
import { response } from 'express';

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
                            Promise.all([Auth.generateUserToken(response.Data), Auth.generateRefreshToken(resonse.Data)])
                                .then((reuslts) => {
                                    let jToken = results[0];
                                    let jRToken = resutls[1];
                                    let Usuario = {
                                        Success: true,
                                        Token: jToken,
                                        RefreshToken: jRToken,
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

export async function obtenerTokenNuevo(req, res)
{
    let refreshToken = req.RefreshToken;

    TokenService.existeRefreshToken(refreshToken)
    .then((response) => {
        
    })
    .catch((err) => {

    });

}