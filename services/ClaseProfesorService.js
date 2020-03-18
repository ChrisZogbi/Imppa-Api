import app from "../app.js";
import { pool } from "./index";

export function getClaseByIdUsuarioService(req, res) {
    var idUsuario = req.body.IdProfesor

    var query = `select * from ClaseProfesor 
                    join ClaseXUsuario on ClaseProfesor.ID = ClaseXUsuario.IDClaseProfesor
                WHERE 
                    ClaseXUsuario.IDUsuario = ${idUsuario}`;

    return pool.promise().query(query, idUsuario)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getClaseByIDService(req, res) {
    var idClase = req.body.ID;
    var query = `SELECT * FROM ClaseProfesor WHERE ID = ${idClase}`;

    return pool.promise().query(query, [idClase])
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addClaseProfesorService(req, res) {
    var ClaseProfesor = req.body;

    var query = `INSERT INTO claseprofesor
                    (IDCategoriaClase, IDTipoClase, Precio, Latitud, Longitud)
                  VALUES
                    (${ClaseProfesor.IDCategoriaClase},${ClaseProfesor.IDTipoClase},${ClaseProfesor.Precio},${ClaseProfesor.Latitud},${ClaseProfesor.Longitud});`

    console.log(query);
    return pool.promise().query(query)
        .then(([result]) => { return ({ Success: true, InsertID: result.insertId }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function updateClaseProfesorService(req, res) {
    var ClaseProfesorData = req.body;

    var query = `UPDATE claseprofesor
                    SET TipoClase = ${ClaseProfesorData.IDTipoClase}
                    ,Precio = '${ClaseProfesorData.Precio}'
                    ,Latitud = '${ClaseProfesorData.Latitud}'
                    ,Longitud = '${ClaseProfesorData.Longitud}'
                WHERE ID = ${ClaseProfesorData.IdClaseProfesor}`;
    console.log(query);
    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function deleteClaseProfesorService(req, res) {
    var idClaseProfesor = req.body.IdClaseProfesor;

    var query = `DELETE FROM claseprofesor
                WHERE ID = ?`;

    return pool.promise().query(query, [idClaseProfesor])
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}
