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
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function getClaseByID(req, res)
{
    var query = `SELECT * FROM ClaseProfesor WHERE ID = ?`
    var idClase = req.body.IdClase;

    pool.promise().query(query, [idClase])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
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
        .catch((err) => { res.status(500).json(err)});
    
    var ClaseXUsuario = {
        "IDUsuario": idUsuario,
        "IDClaseProfesor":idClaseCreada
    };

    res.json(ClaseXUsuario);

    query2 = `INSERT INTO ClaseXUsuario SET ?`

    pool.promise().query(query2, [ClaseXUsuario])
        .then( ([rows,fields]) => {
            next();
        })
        .catch((err) => { res.status(500).json(err)});
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
            res.status(200).json({'Mensaje':"Se actualizo correctamente la Clase."})
        })
        .catch((err) => { res.status(500).json(err)});
}

export function deleteClaseProfesor(req, res)
{
    var idUsuario = req.body.IdUsuario;
    var idClaseProfesor = req.body.IdClaseProfesor;

    var query = `DELETE FROM  [dbo].[ClaseProfesor]
                WHERE [ID] = ?`; 

    pool.promise().query(query, [IdClaseProfesor])
    .then( ([rows,fields]) => {
        res.status(200).json({'Mensaje':"Se elimino correctamente la Clase."})
    })
    .catch((err) => { res.status(500).json(err)});
}
