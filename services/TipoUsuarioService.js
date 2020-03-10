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

export function getTipoUsuarioByIdService(Id)
{
    var query = `SELECT * FROM tipoUsuario WHERE ID = ${Id}`;

    return pool.promise().query(query)
            .then(([rows]) => {return ({Success: true, Data: rows[0]})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addTipoUsuarioService(req)
{
    var query = `INSERT INTO tipousuario (tipo) VALUES (?) `;

    return pool.promise().query(query, [req.body.Tipo])
            .then(() => {return ({Success: true,  Data: 'Se agregó exitosamente el Tipo Usuario'})})
            .catch((err) => { return ({Success: false, Data: err})});
}
export function updateTipoUsuarioService(req)
{
    var DatosActualizar = req.body;

    var query = `UPDATE tipousuario
                    SET TipoUsuario = ${DatosActualizar.TipoUsuario}
                WHERE ID = ${DatosActualizar.Id}`; 
        
    return pool.promise().query(query)
            .then(() => {return ({Success: true, Data: 'Se modificó exitosamente el Tipo Usuario'})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteTipoUsuarioService(req)
{
    var IdTipoUsuario = req.body.IdTipoUsuario;

    var query = `DELETE FROM tipousuario
                WHERE ID = ${IdTipoUsuario}`; 

    return pool.promise().query(query)
            .then(() => {return ({Success: true, Data: 'Se eliminó exitosamente el Tipo Usuario'})})
            .catch((err) => { return ({Success: false, Data: err})});
}