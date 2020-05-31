import app from "../app.js";
import { pool } from "./index";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { User } from '../models/UserModel'
import { Subcription, UserSubcription } from "../models/SubscripcionModel.js";
import { UserType } from "../models/TipoUsuarioModel.js";
import * as Enumns from '../enum';
import { Class, UserClass } from "../models/ClaseProfesorModel.js";

export function getByMailContrasenia(req) {

    var query = `SELECT * FROM usuarios where Mail = '${req.query.Mail}' and Contrasenia = '${req.query.Contrasenia}'`;


    console.log(req.query);

    return pool.promise().query(query)
        .then(([rows, fields]) => {
            if (rows.length == 1) {
                return ({ Success: true, IdUsuario: rows[0] })
            }
            else if (rows.length > 1) {
                return ({ Success: false, Data: { 'message': `Hay mas de un usuario con el mismo mail: ${Mail}` } })
            }
            else {
                return ({ Success: false, Data: { 'message': `El mail ingresado no se encuentra registrado.` } })
            }
        })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export const existeUsuarioMail = async (mail) => {
    const response = await getByMail(mail);
    console.log("resoyeta de getbymail" + response.Success);
    if (!response.Success) { return response };
    return (response.data ? true : false)
}

export const getByMail = async (mail) => {
    return User.findOne({ where: { Mail: mail } })
        .then(usuario => { return ({ Success: true, data: usuario }); })
        .catch((err) => { return ({ Success: false, err: err }) });
}

export function getAll() {
    return User.findAll({
        attributes: ['ID', 'Mail', 'Nombre', 'Apellido', 'Telefono1'],
        include: [
            { model: UserType, attributes: ['Tipo'] },
            { model: UserSubcription, attributes: ['ID'], include: [{ model: Subcription }] }]
    })
        .then((usuarios) => { return ({ Success: true, Data: usuarios }); })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getById(id) {
    return User.findOne({
        where: { ID: id },
        attributes: ['ID', 'Mail', 'Nombre', 'Apellido', 'Telefono1'],
        include: [
            { model: UserType, attributes: ['Tipo'] },
            { model: UserSubcription, attributes: ['ID'], include: [{ model: Subcription }] },
            { model: UserClass, as: 'ClasesUsuario', attributes: ['ID'], include: [{ model: Class, as: 'Clase' }] }
        ],
    })
        .then(usuario => { return ({ Success: true, data: usuario }); })
        .catch((err) => { return ({ Success: false, error: err }) });
}

export const addUser = async (data) => {
    try {
        console.log("llego a addUserService");
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const salt = genSaltSync(10);
        data.Contrasenia = hashSync(data.Contrasenia, salt);
        data.AddedDate = date;

        let newUser = await User.create(data);

        if (data.tipousuarioId == Enumns.ETipoUsuario.Profesor) {
            await UserSubcription.create({ usuarioId: newUser.ID, subscripcionId: data.IdSubscripcion });
        }

        return ({
            Success: true,
            data: await User.findOne({
                where: { ID: newUser.ID },
                attributes: ['ID', 'Mail', 'Nombre', 'Apellido', 'Telefono1'],
                include: [
                    { model: UserType, attributes: ['Tipo'] },
                    { model: UserSubcription, attributes: ['ID'], include: [{ model: Subcription }] }]
            })
        });
    }
    catch (error) {
        return ({ Success: false, err: error.message });
    }
}

export function updateContrasenia(req) {
    var UserData = req.body;

    const salt = genSaltSync(10);
    UserData.Contrasenia = hashSync(UserData.Contrasenia, salt);

    var query = `UPDATE usuarios
        SET Contrasenia = '${UserData.Contrasenia}'
    WHERE ID = ${UserData.ID}`;

    console.log(query);

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }); })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function update(UserData) {
    // try {
    //     await User.update({

    //     });

    //     return ({ Success: true, InsertId: newUser.ID });
    // }
    // catch (error) {
    //     return ({ Success: false, Data: { message: error.message } });
    // }
}

export function remove(req) {
    var UserId = req.body.ID;

    var query = `DELETE FROM usuarios WHERE ID = ${UserId}`;

    console.log(query);

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }); })
        .catch((err) => { return ({ Success: false, Data: err, Query: query }) });
}

export function getByIdGoogle(idGoogle) {
    var query = `select * FROM usuarios WHERE Id_Google = ${idGoogle}`;

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: rows.length > 0 ? true : false, Data: rows }); })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addGoogleUser(UserData) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    UserData.AddedDate = UserData.LastLogin = date;

    var query = `INSERT INTO usuarios
    (TipoUsuario, Mail, AddedDate, LastLogin, Nombre, Apellido, Telefono1, Telefono2, Habilitado, Id_Google)
    VALUES
    (${UserData.TipoUsuario},
    '${UserData.Mail}',
    '${UserData.AddedDate}',
    '${UserData.LastLogin}',
    '${UserData.Nombre}',
    '${UserData.Apellido}',
    '${UserData.Telefono1}',
    '${UserData.Telefono2}',
    ${UserData.Habilitado},
    ${UserData.idGoogle});`

    console.log(query);
    return pool.promise().query(query)
        .then(([result]) => { return ({ Success: true, InsertId: result.insertId }); })
        .catch((err) => { return ({ Success: false, Data: err }) });
}