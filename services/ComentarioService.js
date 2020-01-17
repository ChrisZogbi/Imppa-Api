import app from "../app.js";
import { pool } from "./index";

export function getComentariosByIdProfesor(req, res)
{
    var idProfesor = req.body.IdProfesor

    var query = `SELECT * FROM comentarios WHERE IDProfesor = ?`;

    pool.promise().query(query, [idProfesor])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function getComentarioById(req, res)
{
    var query = `SELECT * FROM comentarios WHERE ID = ?`
    var idUsuario = req.body.IDUsuario;

    pool.promise().query(query, [idUsuario])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
}

export function addComentario(req, res)
{
    var Comentario = req.body;

    var query =  `INSERT INTO comentarios SET ?`

    console.log(query);
    pool.promise().query(query, [Comentario])
        .then( ([rows,fields]) => {
            res.status(200).json({'Mensaje':"Ok."})
        })
        .catch((err) => { res.status(500).json(err)});
}
export function updateComentario(req, res)
{
    var ComentarioData = req.body;

    var query = `UPDATE [comentarios]
                    SET [Comentario] = ${ComentarioData.Comentario}
                    ,[Puntaje] = '${ComentarioData.Puntaje}'
                WHERE [ID] = ${ComentarioData.IdComentario}`; 
    console.log(query);
    pool.promise().query(query)
        .then( ([rows,fields]) => {
            res.status(200).json({'Mensaje':"Se actualizo correctamente el Comentario."})
        })
        .catch((err) => { res.status(500).json(err)});
}

export function deleteComentario(req, res)
{
    var idComentario = req.body.IdComentario;

    var query = `DELETE FROM  [comentarios]
                WHERE [ID] = ?`; 

    pool.promise().query(query, [idComentario])
    .then( ([rows,fields]) => {
        res.status(200).json({'Mensaje':"Se eliminó correctamente el comentario."})
    })
    .catch((err) => { res.status(500).json(err)});
}
