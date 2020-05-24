import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getAllSubcripcion() {
    console.log("Llego al service");
    
    var query = `SELECT * FROM Subscripcion`;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, error: `Ocurrio un error en ${getAllSubcripcion.name}. Error: ${err.message}` }) });
}

export function getSubcripcionByIdService(req) {
    var query = `SELECT * FROM Subscripcion WHERE ID = ?`;

    return pool.promise().query(query, [req.query.Id])
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getSubcripcionByIdProfesor(idProfesor) {
    const query =
        `SELECT subscripcion.* FROM subscripcion JOIN subscripcionusuario
            on subscripcion.ID = subscripcionusuario.IDSubscripcion
        where subscripcionusuario.IDUsuario = ${idProfesor}`;

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addSubcripcionService(Subcripcion) {
    let nombreSubscripcion = Subcripcion.Nombre.charAt(0).toUpperCase() + Subcripcion.Nombre.slice(1)
    
    return ExisteSubcripcion(nombreSubscripcion)
        .then((existeSubscripcion) => {

            if (existeSubscripcion) { return ({ Success: false, Data: `Ya existe la Subscripcion ${Subcripcion.Nombre}` }) };

            var query = `INSERT INTO Subscripcion (Nombre, Descripcion, precio, CantClases) VALUES ('${Subcripcion.Nombre}', '${Subcripcion.Descripcion}', ${Subcripcion.Precio}, ${Subcripcion.CantidadClases}) `;

            return pool.promise().query(query)
                .then(() => { return ({ Success: true }) })
                .catch((err) => { return ({ Success: false, Data: err }) });
        })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function ExisteSubcripcion(nombreSubscripcion) {
    var query = `SELECT * FROM subscripcion WHERE Nombre = '${nombreSubscripcion}' `;

    return pool.promise().query(query)
        .then(([rows]) => { return rows.length > 0 })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addUserSubcripcion(idUsuario, idSubscripcion) {
    const query = `INSERT INTO subscripcionusuario (IDUsuario, IDSubscripcion) VALUES (${idUsuario}, ${idSubscripcion})`
    console.log(query);
    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function updateSubcripcionService(req) {
    var DatosActualizar = req.body;

    var query = `UPDATE subscripcion
                    SET Nombre = '${DatosActualizar.Nombre}',
                    Descripcion = '${DatosActualizar.Descripcion}',
                    Precio = ${DatosActualizar.Precio},
                    CantClases = ${DatosActualizar.CantidadClases}
                WHERE ID = ${DatosActualizar.ID}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function deleteSubcripcionService(req) {
    var IdTipoUsuario = req.body.ID;

    var query = `DELETE FROM subscripcion
                WHERE ID = ${IdTipoUsuario}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}
