import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getClaseXUsuario(req, res)
{
    var query = `SELECT * FROM clasexusuario`;
    console.log(query);
    pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function getClaseXUsuarioByIdUsuario(req, res)
{
    var query = `SELECT * FROM clasexusuario WHERE IDUsuario = ?`;

    pool.promise().query(query, [req.query.IDUsuario])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function getClaseXUsuarioByIdClase(req, res)
{
    var query = `SELECT * FROM clasexusuario WHERE IDClase = ?`;

    pool.promise().query(query, [req.query.IDClase])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function addClaseXUsuario(req, res, ClaseXUsuario)
{
    var query = `INSERT INTO clasexusuario (IDUsuario, IDClaseProfesor) VALUES (?) `;

    pool.promise().query(query, [req.body])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json({'Mensaje':'Se agrego correctamente la ClaseXUsuario'});
            })
        .catch((err) => { res.status(500).json(err)});
}
export function updateClaseXUsuario(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[clasexusuario]
                    SET [IDUsuario] = ${DatosActualizar.IDUsuario},
                    [IDClaseProfesor] = ${DatosActualizar.IDClaseProfesor}
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
        pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json({'Mensaje':'Se actualizó correctamente ela ClaseXUsuario'});
            })
        .catch((err) => { res.status(500).json(err)});
}

export function deleteClaseXUsuario(req, res)
{
    var IdClaseXUsuario = req.body.Id;

    var query = `DELETE FROM  [dbo].[clasexusuario]
                WHERE [ID] = ${IdClaseXUsuario}`;

    pool.promise().query(query)
    .then( ([rows,fields]) => {
        console.log(rows);
        res.status(200).json({'Mensaje':'Se eliminó correctamente la ClaseXUsuario'});
        })
    .catch((err) => { res.status(500).json(err)});
}