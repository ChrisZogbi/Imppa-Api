import app from "../app.js";
import { pool } from "./index";
import { json } from "express";
import { NText } from "mssql";
//import { Request } from "mssql";

export function getTipoUsuarioService(req)
{
    var query = `SELECT * FROM ipousuario`;
    console.log(query);
    return pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            return ({
                Success: true,
                Data: rows
            })
        })
        .catch((err) => { 
            console.log("error");
            return ({
                Success: false,
                Data: err
            });
        });
}

export function getTipoUsuarioByIdService(req, res)
{
    var query = `SELECT * FROM TipoUsuario WHERE ID = ?`;

    pool.promise().query(query, [req.query.Id])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function addTipoUsuarioService(req, res)
{
    var query = `INSERT INTO tipousuario (tipo) VALUES (?) `;

    pool.promise().query(query, [req.body.Tipo])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json({'Mensaje':'Se agrego correctamente el Tipo de Usuario'});
            })
        .catch((err) => { res.status(500).json(err)});
}
export function updateTipoUsuarioService(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[TipoUsuario]
                    SET [TipoUsuario] = ${DatosActualizar.TipoUsuario}
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
        pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json({'Mensaje':'Se actualizó correctamente el Tipo de Usuario'});
            })
        .catch((err) => { res.status(500).json(err)});
}

export function deleteTipoUsuarioService(req, res)
{
    var IdTipoUsuario = req.body.IdTipoUsuario;

    var query = `DELETE FROM  [dbo].[TipoUsuario]
                WHERE [ID] = ${IdTipoUsuario}`; 

    pool.promise().query(query)
    .then( ([rows,fields]) => {
        console.log(rows);
        res.status(200).json({'Mensaje':'Se eliminó correctamente el Tipo de Usuario'});
        })
    .catch((err) => { res.status(500).json(err)});
}