import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getTipoUsuario(req, res)
{
    var query = `SELECT * FROM Subscripcion`;
    console.log(query);
    pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.json(rows);
            })
        .catch(console.log)
}

export function getTipoUsuarioById(req, res)
{
    var query = `SELECT * FROM Subscripcion WHERE ID = ?`;

    pool.promise().query(query, [req.query.Id])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.json(rows);
            })
        .catch(console.log)
}

export function addTipoUsuario(req, res)
{
    var query = `INSER INTO Subscripcion VALUES (?) `;

    pool.promise().query(query, [req.body.NuevaSubscripcion])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.json('Se agrego correctamente el Tipo de Usuario');
            })
        .catch(console.log)
}
export function updateTipoUsuario(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[Subscripcion]
                    SET [Nombre] = ${DatosActualizar.TipoUsuario},
                    [Descripcion] = ${DatosActualizar.Descripcion},
                    [Precio] = ${DatosActualizar.Precio},
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
        pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.json('Se actualizó correctamente el Tipo de Usuario');
            })
        .catch(console.log)
}

export function deleteTipoUsuario(req, res)
{
    var IdTipoUsuario = req.body.Id;

    var query = `DELETE FROM  [dbo].[Subscripcion]
                WHERE [ID] = ${Id}`; 

    pool.promise().query(query)
    .then( ([rows,fields]) => {
        console.log(rows);
        res.json('Se eliminó correctamente el Tipo de Usuario');
        })
    .catch(console.log)
}
