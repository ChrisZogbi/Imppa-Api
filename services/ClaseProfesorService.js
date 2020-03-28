import app from "../app.js";
import { pool } from "./index";

export function getClaseByIdUsuarioService(req, res) {
    var idUsuario = req.query.IdProfesor

    var query = `select * from ClaseProfesor 
                    join ClaseXUsuario on ClaseProfesor.ID = ClaseXUsuario.IDClaseProfesor
                WHERE 
                    ClaseXUsuario.IDUsuario = ${idUsuario}`;
    console.log(query);
    return pool.promise().query(query, idUsuario)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getAllClases() {
    const query = `select * from ClaseProfesor`;

    return pool.promise().query(query, [idClase])
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

export function getClaseByFilter(req) {
    const claseFilter = req.body;

    const query =
        `select cp.* from claseprofesor as cp join diasxclase dc on cp.ID = dc.IDClaseProfesor
        where 
        cp.IDTipoClase = ${claseFilter.IdTipoClase}`

    if (claseFilter.FiltraCategoria > 0) {
        query = query + `AND cp.IDCategoriaClase = ${IdCategoriaClase}`
    }

    if (claseFilter.FiltraPrecio) {
        query = query + `AND (cp.Precio >= ${claseFilter.PrecioMin} and cp.Precio <= ${claseFilter.PrecioMax})`
    }

    if (claseFilter.FiltraDias) {
        query = query + `AND (dc.Lunes = ${claseFilter.Lunes} and dc.Martes = ${claseFilter.Martes} and dc.Miercoles = ${claseFilter.Miercoles} and dc.Jueves = ${claseFilter.Jueves}
            and  dc.Viernes = ${claseFilter.Viernes} and dc.Sabado = ${claseFilter.Sabado} and dc.Domingo = ${claseFilter.Domingo})`
    }

    console.log(query);
    return pool.promise().query(query)
        .then(([result]) => { return ({ Success: true, InsertID: result.insertId }) })
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

function addHorariosClase(idClaseProfesor)
{}

function addDiasClase(idClaseProfesor)
{}
