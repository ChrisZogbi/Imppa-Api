import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getTipoClaseService(req)
{
    var query = `SELECT * FROM TipoClase`;
    console.log(query);
    return pool.promise().query(query)
            .then(([rows]) => { if(rows.length == 1) { return ({Success: true, Data: rows})}})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addTipoClaseService(req)
{
    var query = `INSER INTO TipoClase VALUES (?) `;

    return pool.promise().query(query, [req.body.NuevoTipoClase])
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
export function updateTipoClaseService(req)
{
    var DatosActualizar = req.body;

    var query = `UPDATE tipoclase
                    SET Tipo = ${DatosActualizar.Tipo}
                WHERE ID = ${DatosActualizar.Id}`; 
        
    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteTipoClaseService(req)
{
    var IdTipoClase = req.body.IdTipoClase;

    var query = `DELETE FROM tipoclase
                WHERE ID = ${IdTipoClase}`; 

    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
