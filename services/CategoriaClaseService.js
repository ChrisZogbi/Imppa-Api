import app from "../app.js";
import { pool } from "./index";

export function getCategoriaClaseService(req) {
    var query = `SELECT * FROM categoriaclase`;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getCategoriaClaseByNombreCategoriaService(nombreCategoria) {
    var query = `SELECT * FROM categoriaclase WHERE NombreCategoria = ${nombreCategoria}`;

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: rows.length > 0, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function ExisteCategoria(nombreCategoria) {
    var query = `SELECT * FROM categoriaclase WHERE NombreCategoria = ${nombreCategoria}`;

    return pool.promise().query(query)
        .then(([rows]) => { return rows.length > 0 })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addCategoriaClaseService(nombreCategoria) {
    return ExisteCategoria(nombreCategoria)
            .then((existeCategoria) => {
                if (existeCategoria) { return ({ Success: false, Data: `Ya existe la categoria ${nombreCategoria}` }) };
                var query = `INSERT INTO categoriaclase (NombreCategoria, Habilitado) VALUES ('${req.body.Categoria}', true) `;
                return pool.promise().query(query)
                    .then(() => { return ({ Success: true }) })
                    .catch((err) => { return ({ Success: false, Data: err }) });
            })
            .catch((err) => { return ({ Success: false, Data: err }) });
    }

export function updateCategoriaClaseService(req, res) {
    var DatosActualizar = req.body;

    var query = `UPDATE categoriaclase
                    SET NombreCategoria = '${DatosActualizar.Categoria}',
                    Habilitado = ${DatosActualizar.Habilitado}
                WHERE ID = ${DatosActualizar.ID}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function deleteCategoriaClaseService(req, res) {
    var Idcategoriaclase = req.body.ID;

    var query = `DELETE FROM categoriaclase
                WHERE ID = ${Idcategoriaclase}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}