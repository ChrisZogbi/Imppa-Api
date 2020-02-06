import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getClaseXUsuarioService(req, res)
{
    var query = `SELECT * FROM clasexusuario`;
    console.log(query);
    return pool.promise().query(query)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getClaseXUsuarioByIdUsuarioService(req, res)
{
    var query = `SELECT * FROM clasexusuario WHERE IDUsuario = ?`;

    return pool.promise().query(query, [req.query.IDUsuario])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getClaseXUsuarioByIdClaseService(req, res)
{
    var query = `SELECT * FROM clasexusuario WHERE IDClase = ?`;

    return pool.promise().query(query, [req.query.IDClase])
            .then(() => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});   
}

export function addClaseXUsuarioService(req, res, ClaseXUsuario)
{
    var query = `INSERT INTO clasexusuario (IDUsuario, IDClaseProfesor) VALUES (?) `;

    return pool.promise().query(query, [req.body])
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
export function updateClaseXUsuarioService(req, res)
{
    var DatosActualizar = req.body;

    var query = `UPDATE [dbo].[clasexusuario]
                    SET [IDUsuario] = ${DatosActualizar.IDUsuario},
                    [IDClaseProfesor] = ${DatosActualizar.IDClaseProfesor}
                WHERE [ID] = ${DatosActualizar.Id}`; 
        
    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});   
    }

export function deleteClaseXUsuarioService(req, res)
{
    var IdClaseXUsuario = req.body.Id;

    var query = `DELETE FROM  [dbo].[clasexusuario]
                WHERE [ID] = ${IdClaseXUsuario}`;

    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}