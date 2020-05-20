import app from "../app.js";
import { pool } from "./index";

export function getTipoClaseService(req) {
    var query = `SELECT * FROM TipoClase`;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function ExisteTipoClase(tipoClaseDescripcion) {
    var query = `SELECT * FROM tipoclase WHERE Tipo = ${tipoClaseDescripcion}`;

    return pool.promise().query(query)
        .then(([rows]) => { return rows.length > 0 })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addTipoClase(tipoClaseDescripcion) {
    tipoClaseDescripcion = tipoClaseDescripcion.charAt(0).toUpperCase() + tipoClaseDescripcion.slice(1)

    return ExisteTipoClase(tipoClaseDescripcion)
        .then((existeTipoClaseDescripcion) => {

            if (existeTipoClaseDescripcion) { return ({ Success: false, Data: `Ya existe el Tipo Clase ${tipoClaseDescripcion}` }) };
            
            var query = `INSERT INTO tipoclase (Tipo) VALUES ('${tipoClaseDescripcion}') `;;
            
            return pool.promise().query(query)
                .then(() => { return ({ Success: true }) })
                .catch((err) => { return ({ Success: false, Data: err }) });
        })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function updateTipoClaseService(req) {
    var DatosActualizar = req.body;

    var query = `UPDATE tipoclase
                    SET Tipo = ${DatosActualizar.Tipo}
                WHERE ID = ${DatosActualizar.Id}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function deleteTipoClaseService(req) {
    var IdTipoClase = req.body.ID;

    var query = `DELETE FROM tipoclase
                WHERE ID = ${IdTipoClase}`;

    console.log(query);
    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}
