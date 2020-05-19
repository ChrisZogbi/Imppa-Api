import app from "../app.js";
import { pool } from "./index";

export function existeRefreshToken(idUsuario, refreshToken) {
    var query = `select u.* from refreshtoken rt join usuarios u on rt.IdUsuario = u.ID where Token = '${refreshToken}' and rt.Habilitado = true  limit 1 `;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return { Success: rows.length === 1, Data: rows[0] } })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function traerRefreshToken(refreshToken) {
    var query = `SELECT * FROM refreshtoken where token = '${refreshToken}' order by id desc`;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function saveRefreshToken(idUsuario, refreshToken) {
    var query = `INSERT INTO refreshtoken (IdUsuario, Token, Habilitado) VALUES (${idUsuario}, '${refreshToken}', true) `;

    console.log(query);
    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function deleteRefreshToken(idUsuario, refreshToken) {

    var query = `DELETE FROM refreshtoken
                WHERE IdUsuario = ${idUsuario} and token = ${refreshToken}`;

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}
