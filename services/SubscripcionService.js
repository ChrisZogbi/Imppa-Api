import app from "../app.js";
import { pool } from "./index";
//import { Request } from "mssql";

export function getSubcripcionService(req) {
    var query = `SELECT * FROM Subscripcion`;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
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
        .then(([rows]) => { return ({ Success: true, Data: rows[0] }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addSubcripcionService(req) {
    let Subcripcion = req.body

    var query = `INSERT INTO Subscripcion (Nombre, Descripcion, precio, CantClases) VALUES ('${Subcripcion.Nombre}', '${Subcripcion.Descripcion}', ${Subcripcion.Precio}, ${Subcripcion.CantidadClases}) `;

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
