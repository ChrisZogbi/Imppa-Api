import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getCategoriaClase(req, res)
{
    var query = `SELECT * FROM categoriaclase`;
    console.log(query);
    return pool.promise().query(query)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getCategoriaClaseByNombreCategoria(req, res)
{
    var query = `SELECT * FROM categoriaclase WHERE NombreCategoria = ?`;

    return pool.promise().query(query, [req.query.Id])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addCategoriaClase(req, res)
{
    var query = `INSERT INTO categoriaclase (NombreCategoria, Habilitado) VALUES (?) `;

    return pool.promise().query(query, [req.body.Tipo])
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function updateCategoriaClase(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[categoriaclase]
                    SET [NombreCategoria] = ${DatosActualizar.NombreCategoria},
                    [Habilitado] = ${DatosActualizar.Habilitado}
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteCategoriaClase(req, res)
{
    var Idcategoriaclase = req.body.Idcategoriaclase;

    var query = `DELETE FROM  [dbo].[categoriaclase]
                WHERE [ID] = ${Idcategoriaclase}`;

    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}