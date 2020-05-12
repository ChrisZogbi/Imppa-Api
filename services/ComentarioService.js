import app from "../app.js";
import { pool } from "./index";

export function getComentariosProfesorService(idProfesor)
{
    var query = `SELECT * FROM comentarios WHERE IDProfesor = ${idProfesor}`;

    return pool.promise().query(query)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getComentariosClaseService(idClaseProfesor)
{
    var query = `SELECT * FROM comentarios WHERE IDClaseProfesor = ${idClaseProfesor}`;

    return pool.promise().query(query)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getComentarioByIdService(idComentario)
{
    var query = `SELECT * FROM comentarios WHERE ID = ${idComentario}`

    return pool.promise().query(query)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});   
}

export function addComentarioService(comentarioData)
{
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
