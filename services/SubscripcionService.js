import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getSubcripcionService(req)
{
    var query = `SELECT * FROM Subscripcion`;
    console.log(query);
    return pool.promise().query(query)
            .then(([rows]) => { if (rows.length == 1) { return ({Success: true, Data: rows})}})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getSubcripcionByIdService(req)
{
    var query = `SELECT * FROM Subscripcion WHERE ID = ?`;

    return pool.promise().query(query, [req.query.Id])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addSubcripcionService(req)
{
    var query = `INSER INTO Subscripcion VALUES (?) `;

    return pool.promise().query(query, [req.body.NuevaSubscripcion])
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
export function updateSubcripcionService(req)
{
    var DatosActualizar = req.body;

    var query = `UPDATE subscripcion
                    SET Nombre = ${DatosActualizar.Nombre},
                    Descripcion = ${DatosActualizar.Descripcion},
                    Precio = ${DatosActualizar.Precio},
                WHERE ID = ${DatosActualizar.Id}`; 
        
    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteSubcripcionService(req)
{
    var IdTipoUsuario = req.body.Id;

    var query = `DELETE FROM subscripcion
                WHERE ID = ${Id}`; 

    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
