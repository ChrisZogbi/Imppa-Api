import app from "../app.js";
import { pool } from "./index";
import { ETipoClase } from '../enum'

export function getClaseByIdUsuarioService(idUsuario) {

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

export function getClaseDistancia(claseFilter) {
    let query =
        `select 
            u.ID as IdProfesor, u.Nombre, u.Apellido, u.Telefono1 as Telefono,
            cp.ID as IdClaseProfesor, cp.Precio,
            cc.ID as IdCategoriaClase, cc.NombreCategoria,
            dc.Lunes, dc.Martes, dc.Miercoles, dc.Jueves, dc.Viernes, dc.Sabado, dc.Domingo
        from 
            claseprofesor as cp join diasxclase dc on cp.ID = dc.IDClaseProfesor
                                join clasexusuario cu on cu.IDClaseProfesor = cp.ID
                                join usuarios u on u.id = cu.IDUsuario
                                join categoriaclase cc on cc.ID = cp.IDCategoriaClase
        where 
            cp.Hablitada = true and cp.IDTipoClase = ${ETipoClase.ADistancia} `

    if (claseFilter.FiltraCategoria) {
        query = query + `AND cp.IDCategoriaClase = ${claseFilter.IdCategoria} `
    }

    if (claseFilter.FiltraPrecio) {
        query = query + `AND (cp.Precio >= ${claseFilter.PrecioMin} and cp.Precio <= ${claseFilter.PrecioMax}) `
    }

    if (claseFilter.FiltraDias) {
        query = query + `AND (dc.Lunes = ${claseFilter.Lunes} or dc.Martes = ${claseFilter.Martes} or dc.Miercoles = ${claseFilter.Miercoles} or dc.Jueves = ${claseFilter.Jueves}
            or  dc.Viernes = ${claseFilter.Viernes} or dc.Sabado = ${claseFilter.Sabado} or dc.Domingo = ${claseFilter.Domingo})`
    }

    console.log(query)

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err, Query: query }) });
}

export function getClaseByUbicacion(req) {
    const alumnoUbicacion = req.query;

    let bordeSuperior = parseFloat(alumnoUbicacion.Latitud) + 0.02;
    let bordeInferior = parseFloat(alumnoUbicacion.Latitud) - 0.02;
    let bordeDerecho = parseFloat(alumnoUbicacion.Longitud) + 0.02;
    let bordeIzquierdo = parseFloat(alumnoUbicacion.Longitud) - 0.02;

    const query =
        `select 
            u.ID as IdProfesor, u.Nombre, u.Apellido, u.telefono1 as Telefono, cp.Precio, cp.Latitud, cp.Longitud, 
            cc.ID as IdCategoriaClase, cc.NombreCategoria,
            dc.Lunes, dc.Martes, dc.Miercoles, dc.Jueves, dc.Viernes, dc.Sabado, dc.Domingo
        from claseprofesor as cp
                    join clasexusuario as cu on cp.ID = cu.IDClaseProfesor
                    join usuarios as u on cu.IDUsuario = u.ID
                    join diasxclase as dc on cp.ID = dc.IDClaseProfesor
                    join categoriaclase as cc on cc.ID = cp.IDCategoriaClase
        where cp.Hablitada = true and IDTipoClase = ${ETipoClase.Presencial} 
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

export async function updateClase(ClaseData) {
    return new Promise((resolve, reject) => {

        console.log("Empezo la promise en el service");
        pool.getConnection(function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) {                  //Transaction Error (Rollback and release connection)
                    console.log("Error al empezar la transaccion");
                    connection.rollback(function () {
                        connection.release();
                        resolve({ Success: false, Data: err });
                        //Failure
                    });
                }
                else {
                    let queryUpdateClaseProfesor =
                        `UPDATE claseprofesor
                            SET 
                            IDCategoriaClase = ${ClaseData.IdCategoriaClase}
                            ,IDTipoClase = ${ClaseData.IdTipoClase}
                            ,Precio = '${ClaseData.Precio}'
                            ,Latitud = '${ClaseData.Latitud}'
                            ,Longitud = '${ClaseData.Longitud}'
                        WHERE ID = ${ClaseData.IdClase}`;

                    connection.query(queryUpdateClaseProfesor, function (err, results) {
                        if (err) {          //Query Error (Rollback and release connection)
                            connection.rollback(function () {
                                connection.release();
                                resolve({ Success: false, Data: err });
                                //Failure
                            });
                        }
                        let queryUpdateDiasClase =
                            `UPDATE diasxclase
                                    SET Lunes = ${ClaseData.Lunes}
                                    ,Martes = ${ClaseData.Martes}
                                    ,Miercoles = ${ClaseData.Miercoles}
                                    ,Jueves = ${ClaseData.Jueves}
                                    ,Viernes = ${ClaseData.Viernes}
                                    ,Sabado = ${ClaseData.Sabado}
                                    ,Domingo = ${ClaseData.Domingo}
                                WHERE IDClaseProfesor = ${ClaseData.IdClase}`;

                        connection.query(queryUpdateDiasClase, function (err, results) {
                            if (err) {          //Query Error (Rollback and release connection)
                                connection.rollback(function () {
                                    connection.release();
                                    resolve({ Success: false, Data: err });
                                    //Failure
                                });
                            }
                            connection.commit(function (err) {
                                if (err) {
                                    connection.rollback(function () {
                                        connection.release();
                                        resolve({ Success: false, Data: err });
                                        //Failure
                                    });
                                } else {
                                    connection.release();
                                    //Success
                                    resolve({ Success: true });
                                }
                            });
                        });
                    });
                }
            })
        });
    })
        .then((result) => { return (result) });
}

export function deleteClaseProfesorService(idClaseProfesor) {
    var query = `DELETE FROM claseprofesor
                WHERE ID = ${idClaseProfesor}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function deleteDiasXClase(idClaseProfesor) {
    var query = `DELETE FROM diasxclase
                WHERE IDClaseProfesor = ${idClaseProfesor}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function DeshabilitarClase(req) {
    var idClaseProfesor = req.query.IdClaseProfesor;

    var query = `UPDATE claseprofesor
                    SET Hablitada = false
                WHERE ID = ${idClaseProfesor}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function HabilitarClase(req) {
    var idClaseProfesor = req.query.IdClaseProfesor;

    console.log(req.query.IdClaseProfesor)

    var query = `UPDATE claseprofesor
                    SET Hablitada = true
                WHERE ID = ${idClaseProfesor}`;

    console.log(query);

    return pool.promise().query(query)
        .then((rows, fields) => { return ({ Success: true }) })
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

function addHorariosClase(idClaseProfesor) { }

function DeleteDiasClases(idClaseprofeso) { }
