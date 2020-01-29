import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getSubcripcionService(req, res)
{
    var query = `SELECT * FROM Subscripcion`;
    console.log(query);
    return pool.promise().query(query)
            .then(([rows]) => { if (rows.length == 1) { return ({Success: true, Data: rows})}})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getSubcripcionByIdService(req, res)
{
    var query = `SELECT * FROM Subscripcion WHERE ID = ?`;

    return pool.promise().query(query, [req.query.Id])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addSubcripcionService(req, res)
{
    var query = `INSER INTO Subscripcion VALUES (?) `;

    return pool.promise().query(query, [req.body.NuevaSubscripcion])
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
export function updateSubcripcionService(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[Subscripcion]
                    SET [Nombre] = ${DatosActualizar.Nombre},
                    [Descripcion] = ${DatosActualizar.Descripcion},
                    [Precio] = ${DatosActualizar.Precio},
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteSubcripcionService(req, res)
{
    var IdTipoUsuario = req.body.Id;

    var query = `DELETE FROM  [dbo].[Subscripcion]
                WHERE [ID] = ${Id}`; 

    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
