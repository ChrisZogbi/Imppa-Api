import app from "../app.js";
import { pool } from "./index";
import { json } from "express";
import { NText } from "mssql";
//import { Request } from "mssql";

export function getAllTipoUsuarioService() {
    var query = `SELECT * FROM tipousuario`;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getTipoUsuarioByIdUsuarioService(IdUsurio) {
    var query =
        `SELECT tipousuario.* FROM tipousuario join usuarios
        on tipousuario.ID = usuarios.TipoUsuario
        where usuarios.ID = ${IdUsurio}`;

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function ExisteTipoUsuario(tipoUsuario) {
    var query = `SELECT * FROM tipousuario WHERE Tipo = ${tipoUsuario}`;

    return pool.promise().query(query)
        .then(([rows]) => { return rows.length > 0 })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addTipoUsuarioService(tipoUsuario) {
    tipoUsuario = tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1)
    
    return ExisteTipoUsuario(tipoUsuario)
        .then((existeTipoTipoUsuario) => {

            if (existeTipoTipoUsuario) { return ({ Success: false, Data: `Ya existe el Tipo Usuario ${tipoUsuario}` }) };

            var query = `INSERT INTO tipousuario (tipo) VALUES ('${tipoUsuario}') `;

            return pool.promise().query(query)
                .then(() => { return ({ Success: true }) })
                .catch((err) => { return ({ Success: false, Data: err }) });
        })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function updateTipoUsuarioService(req) {
    var DatosActualizar = req.body;

    var query = `UPDATE tipousuario
                    SET TipoUsuario = ${DatosActualizar.TipoUsuario}
                WHERE ID = ${DatosActualizar.Id}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true, Data: 'Se modificó exitosamente el Tipo Usuario' }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function deleteTipoUsuarioService(req) {
    var IdTipoUsuario = req.body.IdTipoUsuario;

    var query = `DELETE FROM tipousuario
                WHERE ID = ${IdTipoUsuario}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true, Data: 'Se eliminó exitosamente el Tipo Usuario' }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}