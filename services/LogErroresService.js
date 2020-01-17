import { pool } from "./index";
import { DATE } from "mysql2/lib/constants/types";

export function addLogErrores(LugarError, Mensaje)
{
    let MensajeError = `Ocurrio en ${LugarError}. Mensaje: ${MensajeError}`;

    var query = `INSERT INTO logErrores (FechaError, MensajeError) VALUES (?) `;

    pool.promise().query(query, [Fecha, MensajeError])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json('Ocurrio un error. Verifique el Log de Errores.');
            })
        .catch((err) => { res.status(500).json(err)});
}