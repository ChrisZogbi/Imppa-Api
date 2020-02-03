import app from "../app.js";
import { pool } from "./index";

export function getClaseByIdUsuario(req, res)
{
    var idUsuario = req.body.IdUsuario

    var query = `select * from ClaseProfesor 
                    join ClaseXUsuario on ClaseProfesor.ID = ClaseXUsuario.IDClaseProfesor
                WHERE 
                    ClaseXUsuario.IDUsuario = ?`;

    return pool.promise().query(query, idUsuario)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getClaseByID(req, res)
{
    var query = `SELECT * FROM ClaseProfesor WHERE ID = ?`
    var idClase = req.body.IdClase;

    return pool.promise().query(query, [idClase])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addClaseProfesor(req, res)
{
    var ClaseProfesor = req.body;
    var idUsuario = req.body.IdUsuario;
    var idClaseCreada;

    var query =  `INSERT INTO ClaseProfesor SET ?`

    console.log(query);
    return pool.promise().query(query, [ClaseProfesor])
            .then(([rows]) => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
    
    var ClaseXUsuario = {
        "IDUsuario": idUsuario,
        "IDClaseProfesor":idClaseCreada
    };

    res.json(ClaseXUsuario);

    query2 = `INSERT INTO ClaseXUsuario SET ?`

    return pool.promise().query(query2, [ClaseXUsuario])
        .then( ([rows,fields]) => {
            next();
        })
        .catch((err) => { res.status(500).json(err)});
}

export function updateClaseProfesor(req, res)
{
    var ClaseProfesorData = req.body;

    var query = `UPDATE [dbo].[ClaseProfesor]
                    SET [Direccion] = ${ClaseProfesorData.Comentario}
                    ,[Precio] = '${ClaseProfesorData.Puntaje}'
                WHERE [ID] = ${ClaseProfesorData.IdClaseProfesor}`; 
    console.log(query);
    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteClaseProfesor(req, res)
{
    var idUsuario = req.body.IdUsuario;
    var idClaseProfesor = req.body.IdClaseProfesor;

    var query = `DELETE FROM  [dbo].[ClaseProfesor]
                WHERE [ID] = ?`; 

    return pool.promise().query(query, [IdClaseProfesor])
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
