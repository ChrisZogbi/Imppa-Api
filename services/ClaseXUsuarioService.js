import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getClaseXUsuarioService(req, res)
{
    var query = `SELECT * FROM clasexusuario`;
    console.log(query);
    return pool.promise().query(query)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getClaseXUsuarioByIdUsuarioService(req, res)
{
    var query = `SELECT * FROM clasexusuario WHERE IDUsuario = ?`;

    return pool.promise().query(query, [req.query.IDUsuario])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getClaseXUsuarioByIdClaseService(req, res)
{
    var query = `SELECT * FROM clasexusuario WHERE IDClase = ?`;

    return pool.promise().query(query, [req.query.IDClase])
            .then(() => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});   
}

export function addClaseXUsuarioService(IdUsuario, IdClase)
{
    var query = `INSERT INTO clasexusuario (IDUsuario, IDClaseProfesor) VALUES (${IdUsuario}, ${IdClase}) `;
    console.log(query);
    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteClaseXUsuarioService(req, res)
{
    var IDUsuario = req.body.IDUsuario;
    var IDClaseProfesor = req.body.IDClaseProfesor;

    var query = `DELETE FROM clasexusuario
                WHERE IdUsuario = ${IDUsuario}  and IdClaseProfesor = ${IDClaseProfesor}`;

    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}