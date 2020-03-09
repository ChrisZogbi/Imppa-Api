import app from "../app.js";
import { pool } from "./index";

export function getUserByMailContraseniaService (req) {
    
    var query = `SELECT * FROM usuarios where Mail = '${req.query.Mail}' and Contrasenia = '${req.query.Contrasenia}'`;
   

    console.log(req.query);
    
    return pool.promise().query(query)
        .then(([rows,fields]) => { 
            if(rows.length == 1) { 
                return ({Success: true, Data: rows})
            }
            else if(rows.length > 1){
                return ({Success: false, Data: {'message': `Hay mas de un usuario con el mismo mail: ${Mail}`}})
            }
            else{
                return ({Success: false, Data: {'message': `El mail ingresado no se encuentra registrado.`}})
            }
        })
        .catch((err) => { return ({Success: false, Data: err})});
}

export function getUserByMail(Mail) {
    
    var query = `SELECT * FROM usuarios where Mail = '${Mail}'`;

    console.log(Mail);

    return pool.promise().query(query)
        .then(([rows,fields]) => { 
            console.log("Numero de rows devueltas " + rows.length);
            if(rows.length >= 1) { 
                return ({Success: true, Data: {'message': `Ya existe un usuario con el mismo mail: ${Mail}`}})
            }
            else{
                return ({Success: false})
            }
        })
        .catch((err) => { return ({Success: false, Data: err})});
}

export function getUsersService()
{
    var query = `SELECT * FROM usuarios`;

    return pool.promise().query(query)
        .then(([rows]) => { return({Success: true, Data: rows}); })
        .catch((err) => { return({Success: false, Data: err})});
}

export function getUserService(id)
{

    var query = `SELECT * FROM usuarios WHERE ID = ?`

    return pool.promise().query(query, [id])
        .then(([rows]) => { return({Success: true, Data: rows}); })
        .catch((err) => { return({Success: false, Data: err})});
}

export function addUserService(req)
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var Usuario = req.body;

    Usuario.AddedDate = date

    var query =  `INSERT INTO usuarios SET ?`

    console.log(query);
    return pool.promise().query(query, [Usuario])
        .then(([result]) => { return({Success: true, InsertId: result.insertId}); })
        .catch((err) => { return({Success: false, Data: err})});
}

export function updateContraseniaService(req)
{
    var UserData = req.body;

    var query = `UPDATE usuarios
        SET Contrasenia = '${UserData.Contrasenia}'
    WHERE ID = ${UserData.ID}`; 
    
    console.log(query);

    return pool.promise().query(query)
        .then(() => { return({Success: true}); })
        .catch((err) => { return({Success: false, Data: err})});
}

export function updateUserService(req)
{
    var UserData = req.body;

    var query = `UPDATE usuarios
                    SET TipoUsuario = ${UserData.TipoUsuario}
                    ,Mail = '${UserData.Mail}'
                    ,Nombre = '${UserData.Nombre}'
                    ,Apellido = '${UserData.Apellido}'
                    ,Telefono1 = ${UserData.Telefono1}
                    ,Telefono2 = ${UserData.Telefono2}
                    ,Habilitado = ${UserData.Habilitado}
                WHERE ID = ${UserData.ID}`; 
    console.log(query);
    return pool.promise().query(query)
        .then(() => { return({Success: true}); })
        .catch((err) => { return({Success: false, Data: err})});
}

export function deleteUserService(req)
{
    var UserId = req.body.ID;

    var query = `DELETE FROM usuarios WHERE ID = ${UserId}`; 

                console.log(query);

    return pool.promise().query(query)
        .then(() => { return({Success: true}); })
        .catch((err) => {return({Success: false, Data: err, Query: query})});
}
