import app from "../app.js";
import { pool } from "./index";

export function existeRefreshToken(idUsuario, refreshToken) {
    var query = `SELECT top 1 FROM refreshtoken where IdUsuario = ${idUsuario} and Token = ${refreshToken}, and Habilitado = true `;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return rows.length === 1 })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function saveRefreshToken(idUsuario, refreshToken) {
    var query = `INSERT INTO refreshtoken (IdUsuario, Token, Habilitado) VALUES (${idUsuario}, ${refreshToken}, true) `;

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
