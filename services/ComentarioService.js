import app from "../app.js";
import { pool } from "./index";

export function getComentariosByIdProfesorService(req, res)
{
    var idProfesor = req.body.IdProfesor

    var query = `SELECT * FROM comentarios WHERE IDProfesor = ?`;

    return pool.promise().query(query, [idProfesor])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getComentarioByIdService(req, res)
{
    var query = `SELECT * FROM comentarios WHERE ID = ?`
    var idUsuario = req.body.IDUsuario;

    return pool.promise().query(query, [idUsuario])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});   
}

export function addComentarioService(req, res)
{
    var Data = req.body;

    var query =  `INSERT INTO comentarios VALUES (?, ?)`

    console.log(query);
    return pool.promise().query(query, [Data.IdProfresor, Data.Comentario, Data.Puntaje])
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function updateComentarioService(req, res)
{
    var ComentarioData = req.body;

    var query = `UPDATE [comentarios]
                    SET Comentario = ${ComentarioData.Comentario}
                    ,Puntaje = '${ComentarioData.Puntaje}'
                WHERE ID = ${ComentarioData.IdComentario}`; 
    console.log(query);
    return pool.promise().query(query)
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteComentarioService(req, res)
{
    var idComentario = req.body.IdComentario;

    var query = `DELETE FROM comentarios
                WHERE[ID = ?`; 

    return pool.promise().query(query, [idComentario])
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
