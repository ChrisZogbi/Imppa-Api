import app from "../app.js";
import { pool } from "./index";
import {genSaltSync, hashSync, compareSync} from "bcryptjs";

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

export function getByMail(Mail) {

    var query = `SELECT * FROM usuarios where Mail = '${Mail}'`;
    
    console.log(Mail);

    return pool.promise().query(query)
        .then(([rows, fields]) => {
            console.log("Numero de rows devueltas " + rows.length);
            if (rows.length >= 1) {
                return ({ Success: true, Data: rows[0]})
            }
            else {
                return ({ Success: false, Data: rows })
            }
        })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getAll() {
    var query = 
        `SELECT 
            u.*,
            tu.Tipo
        FROM
            usuarios as u inner join tipousuario as tu on u.TipoUsuario = tu.ID
            order by ID desc `

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }); })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getById(id) {
    var query = `SELECT * FROM usuarios WHERE ID = ${id}`

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }); })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function add(data) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const salt = genSaltSync(10);
    data.Contrasenia = hashSync(data.Contrasenia, 10);

    var Usuario = data;

    Usuario.AddedDate = date

    var query = `INSERT INTO usuarios
    (TipoUsuario, Mail, Contrasenia, AddedDate, LastLogin, Nombre, Apellido, Telefono1, Telefono2, Habilitado)
    VALUES
    (${Usuario.TipoUsuario},
    '${Usuario.Mail}',
    '${Usuario.Contrasenia}',
    '${Usuario.AddedDate}',
    '${Usuario.LastLogin}',
    '${Usuario.Nombre}',
    '${Usuario.Apellido}',
    '${Usuario.Telefono1}',
    '${Usuario.Telefono2}',
    ${Usuario.Habilitado});`

    return pool.promise().query(query)
        .then(([result]) => { return ({ Success: true, InsertId: result.insertId }); })
        .catch((err) => { return ({ Success: false, Data: err }) });
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
    var query = `UPDATE usuarios
                    SET
                    Mail = '${UserData.Mail}'
                    ,Nombre = '${UserData.Nombre}'
                    ,Apellido = '${UserData.Apellido}'
                    ,Telefono1 = ${UserData.Telefono1}
                    ,Telefono2 = ${UserData.Telefono2}
                WHERE ID = ${UserData.ID}`;
    console.log(query);
    return pool.promise().query(query)
        .then(() => { return ({ Success: true }); })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function remove(req) {
    var UserId = req.body.ID;

    var query = `DELETE FROM usuarios WHERE ID = ${UserId}`;

    console.log(query);

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }); })
        .catch((err) => { return ({ Success: false, Data: err, Query: query }) });
}

export function getByIdGoogle(idGoogle)
{
    var query = `select * FROM usuarios WHERE Id_Google = ${idGoogle}`;

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: rows.length > 0 ? true : false, Data: rows }); })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addGoogleUser(UserData)
{
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