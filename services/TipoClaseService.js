import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getTipoUsuario(req, res)
{
    var query = `SELECT * FROM TipoClase`;
    console.log(query);
    pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function getTipoUsuarioById(req, res)
{
    var query = `SELECT * FROM TipoClase WHERE ID = ?`;

    pool.promise().query(query, [req.query.Id])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function addTipoUsuario(req, res)
{
    var query = `INSER INTO TipoClase VALUES (?) `;

    pool.promise().query(query, [req.body.NuevoTipoClase])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json({'Mensaje':'Se agrego correctamente el Tipo de Usuario'});
            })
        .catch((err) => { res.status(500).json(err)});
}
export function updateTipoUsuario(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[TipoClase]
                    SET [Tipo] = ${DatosActualizar.Tipo}
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
        pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json({'Mensaje':'Se actualizó correctamente el Tipo de Usuario'});
            })
        .catch((err) => { res.status(500).json(err)});
}

export function deleteTipoUsuario(req, res)
{
    var IdTipoUsuario = req.body.IdTipoClase;

    var query = `DELETE FROM  [dbo].[TipoClase]
                WHERE [ID] = ${IdTipoClase}`; 

    pool.promise().query(query)
    .then( ([rows,fields]) => {
        console.log(rows);
        res.status(200).json({'Mensaje':'Se eliminó correctamente el Tipo de Usuario'});
        })
    .catch((err) => { res.status(500).json(err)});
}
