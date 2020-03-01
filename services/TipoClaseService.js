import app from "../app.js";
import { pool } from "./index";

export function getTipoClaseService(req)
{
    var query = `SELECT * FROM TipoClase`;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({Success: true, Data: rows})})
        .catch((err) => { return ({Success: false, Data: err})});
}

export function addTipoClaseService(req)
{
    var query = `INSERT INTO tipoclase (Tipo) VALUES ('${req.body.Tipo}') `;

    console.log(query);
    return pool.promise().query(query)
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
    var IdTipoClase = req.body.ID;

    var query = `DELETE FROM tipoclase
                WHERE ID = ${IdTipoClase}`; 

    console.log(query)            ;
    return pool.promise().query(query)
        .then( () => {return ({Success: true})})
        .catch((err) => { return ({Success: false, Data: err})});
}
