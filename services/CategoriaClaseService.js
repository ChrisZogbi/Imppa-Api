import app from "../app.js";
import { pool } from "./index";

export function getCategoriaClaseService(req)
{
    var query = `SELECT * FROM categoriaclase`;
    console.log(query);
    return pool.promise().query(query)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getCategoriaClaseByNombreCategoriaService(req, res)
{
    var query = `SELECT * FROM categoriaclase WHERE NombreCategoria = ?`;

    return pool.promise().query(query, [req.query.Categoria])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addCategoriaClaseService(req, res)
{
    var query = `INSERT INTO categoriaclase (NombreCategoria, Habilitado) VALUES ('${req.body.Categoria}', true) `;

    return pool.promise().query(query, [req.body.Categoria])
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function updateCategoriaClaseService(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE categoriaclase
                    SET NombreCategoria = '${DatosActualizar.Categoria}',
                    Habilitado = ${DatosActualizar.Habilitado}
                WHERE ID = ${DatosActualizar.ID}`; 
        
    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteCategoriaClaseService(req, res)
{
    var Idcategoriaclase = req.body.ID;

    var query = `DELETE FROM categoriaclase
                WHERE ID = ${Idcategoriaclase}`;

    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}