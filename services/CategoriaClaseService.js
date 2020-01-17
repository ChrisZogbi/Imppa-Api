import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getCategoriaClase(req, res)
{
    var query = `SELECT * FROM categoriaclase`;
    console.log(query);
    pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function getCategoriaClaseByNombreCategoria(req, res)
{
    var query = `SELECT * FROM categoriaclase WHERE NombreCategoria = ?`;

    pool.promise().query(query, [req.query.Id])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function addCategoriaClase(req, res)
{
    var query = `INSERT INTO categoriaclase (NombreCategoria, Habilitado) VALUES (?) `;

    pool.promise().query(query, [req.body.Tipo])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json({'Mensaje':'Se agrego correctamente la Categoria'});
            })
        .catch((err) => { res.status(500).json(err)});
}

export function updateCategoriaClase(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[categoriaclase]
                    SET [NombreCategoria] = ${DatosActualizar.NombreCategoria},
                    [Habilitado] = ${DatosActualizar.Habilitado}
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
        pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json({'Mensaje':'Se actualizó correctamente ela Categoria'});
            })
        .catch((err) => { res.status(500).json(err)});
}

export function deleteCategoriaClase(req, res)
{
    var Idcategoriaclase = req.body.Idcategoriaclase;

    var query = `DELETE FROM  [dbo].[categoriaclase]
                WHERE [ID] = ${Idcategoriaclase}`;

    pool.promise().query(query)
    .then( ([rows,fields]) => {
        console.log(rows);
        res.status(200).json({'Mensaje':'Se eliminó correctamente la Categoria'});
        })
    .catch((err) => { res.status(500).json(err)});
}