import app from "../app.js";
import { pool } from "./index";

export function getClaseByIdUsuario(req, res)
{
    var idUsuario = req.body.IdUsuario

    var query = `select * from ClaseProfesor 
                    join ClaseXUsuario on ClaseProfesor.ID = ClaseXUsuario.IDClaseProfesor
                WHERE 
                    ClaseXUsuario.IDUsuario = ?`;

    pool.promise().query(query, idUsuario)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.json(rows);
            })
        .catch(console.log)
}

export function getClaseByID(req, res)
{
    var query = `SELECT * FROM ClaseProfesor WHERE ID = ?`
    var idClase = req.body.IdClase;

    pool.promise().query(query, [idClase])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.json(rows);
            })
        .catch(console.log)
}

export function addClaseProfesor(req, res)
{
    var ClaseProfesor = req.body;
    var idUsuario = req.body.IdUsuario;
    var idClaseCreada;

    var query =  `INSERT INTO ClaseProfesor SET ?`

    console.log(query);
    pool.promise().query(query, [ClaseProfesor])
        .then( ([rows,fields]) => {
            idClaseCreada = fields.insertId;
            next();
        })
        .catch(console.log)
    
    var ClaseXUsuario = {
        "IDUsuario": idUsuario,
        "IDClaseProfesor":idClaseCreada
    };

    query2 = `INSERT INTO ClaseXUsuario SET ?`

    pool.promise().query(query2, [ClaseXUsuario])
        .then( ([rows,fields]) => {
            res.status(200).json("Ok.")
        })
        .catch(console.log)
}

//Falta cambiar ClaseProfesor
export function updateClaseProfesor(req, res)
{
    var ClaseProfesorData = req.body;

    var query = `UPDATE [dbo].[ClaseProfesor]
                    SET [Direccion] = ${ClaseProfesorData.Comentario}
                    ,[Precio] = '${ClaseProfesorData.Puntaje}'
                WHERE [ID] = ${ClaseProfesorData.IdClaseProfesor}`; 
    console.log(query);
    pool.promise().query(query)
        .then( ([rows,fields]) => {
            res.status(200).json("Se actualizo correctamente la Clase.")
        })
        .catch(console.log)
}

export function deleteClaseProfesor(req, res)
{
    var idUsuario = req.body.IdUsuario;
    var idClaseProfesor = req.body.IdClaseProfesor;


    var query = `DELETE FROM  [dbo].[ClaseProfesor]
                WHERE [ID] = ?`; 

    pool.promise().query(query, [IdClaseProfesor])
    .then( ([rows,fields]) => {
        next()
    })
    .catch(console.log)

    var query2 = `DELETE FROM  [dbo].[ClaseXUsuario]
    WHERE [IDUsuario] = ? AND IDClaseProfesor = ?`; 

    pool.promise().query(query2, [idUsuario, idClaseProfesor])
    .then( ([rows,fields]) => {
        res.status(200).json("Se elimino correctamente la Clase.")
    })
    .catch(console.log)
}
