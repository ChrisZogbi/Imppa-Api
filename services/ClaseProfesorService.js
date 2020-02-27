import app from "../app.js";
import { pool } from "./index";

export function getClaseByIdUsuarioService(req, res)
{
    var idUsuario = req.body.IDUsuario

    var query = `select * from ClaseProfesor 
                    join ClaseXUsuario on ClaseProfesor.ID = ClaseXUsuario.IDClaseProfesor
                WHERE 
                    ClaseXUsuario.IDUsuario = ?`;

    return pool.promise().query(query, idUsuario)
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function getClaseByIDService(req, res)
{
    var query = `SELECT * FROM ClaseProfesor WHERE ID = ?`
    var idClase = req.body.ID;

    return pool.promise().query(query, [idClase])
            .then(([rows]) => {return ({Success: true, Data: rows})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function addClaseProfesorService(req, res)
{
    var ClaseProfesor = req.body;

    var query =  `INSERT INTO claseprofesor
                    (ID, IDCategoriaClase, IDTipoClase, Precio, Latitud, Longitud)
                  VALUES
                    (${ClaseProfesor.IDCategoriaClase},${ClaseProfesor.IDTipoClase},${ClaseProfesor.Precio},${ClaseProfesor.Latitud},${ClaseProfesor.Longitud});`

    console.log(query);
    return pool.promise().query(query)
            .then(([result]) => {return ({Success: true, InsertID: result.insertId})})
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

export function updateClaseProfesorService(req, res)
{
    var ClaseProfesorData = req.body;

    var query = `UPDATE claseprofesor
                    SET Direccion = ${ClaseProfesorData.Comentario}
                    ,Precio = '${ClaseProfesorData.Puntaje}'
                WHERE ID = ${ClaseProfesorData.IdClaseProfesor}`; 
    console.log(query);
    return pool.promise().query(query)
            .then(() => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}

export function deleteClaseProfesorService(req, res)
{
    var idUsuario = req.body.IdUsuario;
    var idClaseProfesor = req.body.IdClaseProfesor;

    var query = `DELETE FROM claseprofesor
                WHERE ID = ?`; 

    return pool.promise().query(query, [IdClaseProfesor])
            .then( () => {return ({Success: true})})
            .catch((err) => { return ({Success: false, Data: err})});
}
