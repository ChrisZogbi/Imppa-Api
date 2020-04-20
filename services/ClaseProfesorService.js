import app from "../app.js";
import { pool } from "./index";

export function getClaseByIdUsuarioService(req, res) {
    var idUsuario = req.query.IdProfesor

    var query = `select cp.*, dc.Lunes, dc.Martes, dc.Miercoles, dc.Jueves, dc.Viernes, dc.Sabado, dc.Domingo from ClaseProfesor as cp
                    join ClaseXUsuario on cp.ID = ClaseXUsuario.IDClaseProfesor
                    join diasxclase as dc on cp.ID = dc.IDClaseProfesor
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

    let query =
        `select cp.* from claseprofesor as cp join diasxclase dc on cp.ID = dc.IDClaseProfesor
        where 
        cp.IDTipoClase = 1 `

    if (claseFilter.FiltraCategoria) {
        query = query + `AND cp.IDCategoriaClase = ${claseFilter.IdCategoria} `
    }

    if (claseFilter.FiltraPrecio) {
        query = query + `AND (cp.Precio >= ${claseFilter.PrecioMin} and cp.Precio <= ${claseFilter.PrecioMax}) `
    }

    if (claseFilter.FiltraDias) {
        query = query + `AND (dc.Lunes = ${claseFilter.Lunes} and dc.Martes = ${claseFilter.Martes} and dc.Miercoles = ${claseFilter.Miercoles} and dc.Jueves = ${claseFilter.Jueves}
            and  dc.Viernes = ${claseFilter.Viernes} and dc.Sabado = ${claseFilter.Sabado} and dc.Domingo = ${claseFilter.Domingo}) `
    }

    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getClaseByUbicacion(req) {
    const alumnoUbicacion = req.query;
    console.log()

    let bordeSuperior = parseFloat(alumnoUbicacion.Latitud) + 0.02;
    let bordeInferior = parseFloat(alumnoUbicacion.Latitud) - 0.02;
    let bordeDerecho = parseFloat(alumnoUbicacion.Longitud) + 0.02;
    let bordeIzquierdo = parseFloat(alumnoUbicacion.Longitud) - 0.02;

    const query =
        `select u.Nombre, u.Apellido, u.telefono1 as Telefono, cp.Precio, cp.Latitud, cp.Longitud, dc.Lunes, dc.Martes, dc.Miercoles, dc.Jueves, dc.Viernes, dc.Sabado, dc.Domingo, cc.ID as IdCategoria, cc.NombreCategoria
        from claseprofesor as cp
                    join clasexusuario as cu on cp.ID = cu.IDClaseProfesor
                    join usuarios as u on cu.IDUsuario = u.ID
                    join diasxclase as dc on cp.ID = dc.IDClaseProfesor
                    join categoriaclase as cc on cc.ID = cp.IDCategoriaClase
         where IDTipoClase = 2 
         and (latitud < ${bordeSuperior} AND latitud > ${bordeInferior})
         and ( longitud < ${bordeDerecho} AND  longitud> ${bordeIzquierdo})`

    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addClaseProfesorService(req, res) {
    var ClaseProfesor = req.body;

    var query = `INSERT INTO claseprofesor
                    (IDCategoriaClase, IDTipoClase, Precio, Latitud, Longitud, Hablitada)
                  VALUES
                    (${ClaseProfesor.IDCategoriaClase},${ClaseProfesor.IDTipoClase},${ClaseProfesor.Precio},
                        ${ClaseProfesor.Latitud},${ClaseProfesor.Longitud}, true);`

    console.log(query);
    return pool.promise().query(query)
        .then(([result]) => {
            return addDiasClase(result.insertId, ClaseProfesor).then(resultDias => {
                if (resultDias.Success) { return ({ Success: true, InsertID: result.insertId }) }
            });
        })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

function addDiasClase(idClase, ClaseProfesor) {
    var query = `INSERT INTO diasxclase
                            (IDClaseProfesor,Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Domingo)
                            VALUES
                            (${idClase},${ClaseProfesor.Lunes},${ClaseProfesor.Martes},${ClaseProfesor.Miercoles},${ClaseProfesor.Jueves},${ClaseProfesor.Viernes},${ClaseProfesor.Sabado},${ClaseProfesor.Domingo})`
    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
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

export function DeshabilitarClase(req){
    var idClaseProfesor = req.query.IdClaseProfesor;

    var query = `UPDATE claseprofesor
                    SET Hablitada = false
                WHERE ID = ${idClaseProfesor}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function HabilitarClase(req){
    var idClaseProfesor = req.query.IdClaseProfesor;

    console.log(req.query.IdClaseProfesor)

    var query = `UPDATE claseprofesor
                    SET Hablitada = true
                WHERE ID = ${idClaseProfesor}`;
    
    console.log(query);

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

function addHorariosClase(idClaseProfesor) { }

function DeleteDiasClases(idClaseprofeso) { }
