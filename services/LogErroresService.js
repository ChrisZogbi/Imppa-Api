import { pool } from "./index";
import { DATE } from "mysql2/lib/constants/types";

export function addLogErrores(LugarError, Mensaje)
{
    let MensajeError = `Ocurrio en ${LugarError}. Mensaje: ${Mensaje}`;

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var query = `INSERT INTO logErrores (IDUsuario, FechaError, MensajeError) VALUES (1, '${date}', "${MensajeError}") `;
    console.log(date);

    pool.promise().query(query)
        .then( ([rows,fields]) => { return({Success: true}); })
        .catch((err) => { return({Success:false, Mensaje: err}); });
}