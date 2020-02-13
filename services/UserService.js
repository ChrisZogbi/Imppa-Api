import app from "../app.js";
import { pool } from "./index";

export function getUserByMailContraseniaService (req) {
    
    var query = `SELECT * FROM usuarios where Mail = ? and Contrasenia = ?`;
    
    let Mail = req.query.Mail
    let Password = req.query.Password

    console.log(Mail + Password);
    
    return pool.promise().query(query, [Mail, Password])
        .then(([rows,fields]) => { 
            if(rows.length == 1) { 
                return ({Success: true, Data: rows})
            }
            else{
                return ({Success: false, Data: {'message': `Hay mas de un usuario con el mismo mail: ${Mail}`}})
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

export function getUserService(req)
{

    var query = `SELECT * FROM usuarios WHERE ID = ?`
    var idUsuario = req.body.IDUsuario;

    return pool.promise().query(query, [idUsuario])
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

export function updateUserService(req)
{
    var UserData = req.body;

    var query = `UPDATE [dbo].[Comentarios]
                    SET [TipoUsuario] = ${UserData.TipoUsuario}
                    ,[Mail] = '${UserData.Mail}'
                    ,[Contraseña] = '${UserData.Contraseña}'
                    ,[AddedDate] = '${UserData.AddedDate}'
                    ,[LastLogin] = '${UserData.LastLogin}'
                    ,[Nombre] = '${UserData.Nombre}'
                    ,[Apellido] = '${UserData.Apellido}'
                    ,[Direccion] = '${UserData.Direccion}'
                WHERE [ID] = ${UserData.UserId}`; 
    console.log(query);
    return pool.promise().query(query, [Usuario])
        .then(() => { return({Success: true}); })
        .catch((err) => { return({Success: false, Data: err})});
}

export function deleteUserService(req)
{
    var UserId = req.body.Id;

    var query = `DELETE FROM usuarios WHERE [ID] = ${UserId}`; 

                console.log(query);

    return pool.promise().query(query)
        .then(() => { return({Success: true}); })
        .catch((err) => {return({Success: false, Data: err})});
}
