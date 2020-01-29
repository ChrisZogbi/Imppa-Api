import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getTipoClaseService(req, res)
{
    var query = `SELECT * FROM TipoClase`;
    console.log(query);
    return pool.promise().query(query)
            .then(([rows]) => { if(rows.length == 1) { return ({Success: true, Data: rows})}})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addTipoClaseService(req, res)
{
    var query = `INSER INTO TipoClase VALUES (?) `;

    return pool.promise().query(query, [req.body.NuevoTipoClase])
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
export function updateTipoClaseService(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[TipoClase]
                    SET [Tipo] = ${DatosActualizar.Tipo}
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteTipoClaseService(req, res)
{
    var IdTipoClase = req.body.IdTipoClase;

    var query = `DELETE FROM  [dbo].[TipoClase]
                WHERE [ID] = ${IdTipoClase}`; 

    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
