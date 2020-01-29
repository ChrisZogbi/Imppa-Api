import app from "../app.js";
import { pool } from "./index";
import { json } from "express";
import { NText } from "mssql";
//import { Request } from "mssql";

export function getTipoUsuarioService(req)
{
    var query = `SELECT * FROM tipousuario`;
    console.log(query);
    return pool.promise().query(query)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getTipoUsuarioByIdService(req, res)
{
    var query = `SELECT * FROM tipoUsuario WHERE ID = ?`;

    return pool.promise().query(query, [req.query.Id])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addTipoUsuarioService(req, res)
{
    var query = `INSERT INTO tipousuario (tipo) VALUES (?) `;

    return pool.promise().query(query, [req.body.Tipo])
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
export function updateTipoUsuarioService(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[TipoUsuario]
                    SET [TipoUsuario] = ${DatosActualizar.TipoUsuario}
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteTipoUsuarioService(req, res)
{
    var IdTipoUsuario = req.body.IdTipoUsuario;

    var query = `DELETE FROM  [dbo].[TipoUsuario]
                WHERE [ID] = ${IdTipoUsuario}`; 

    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}