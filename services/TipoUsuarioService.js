import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getTipoUsuario(req, res)
{
    var query = `SELECT * FROM TipoUsuario`;
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
    var query = `SELECT * FROM TipoUsuario WHERE ID = ?`;

    pool.promise().query(query, [req.query.Id])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function addTipoUsuario(req, res)
{
    var query = `INSERT INTO tipousuario (tipo) VALUES (?) `;

    pool.promise().query(query, [req.body.Tipo])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json({'Mensaje':'Se agrego correctamente el Tipo de Usuario'});
            })
        .catch((err) => { res.status(500).json(err)});
}
export function updateTipoUsuario(req, res)
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

export function deleteTipoUsuario(req, res)
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