import app from "../app.js";
import { pool } from "./index";

export function getUserByMailContraseniaService (req, res) {
    var query = `SELECT * FROM usuarios where Mail = ? and Contrasenia = ?`;
    pool.promise().query(query, [req.body.Mail, req.body.Pass])
        .then( ([rows,fields]) => {
            console.log(query);
            console.log(req.body.Mail + req.body.Pass);
            var data;
            if(rows.length == 1)
            {
                data = 
                {
                    "ID": rows[0].ID,
                    "TipoUsuario": rows[0].TipoUsuario,
                    "Mail": rows[0].Mail,
                    "Contrasenia":rows[0].Contrasenia,
                    "AddedDate": rows[0].AddedDate,
                    "LastLogin": rows[0].LastLogin,
                    "Nombre": rows[0].Nombre,
                    "Apellido": rows[0].Apellido,
                    "Telefono1": rows[0].Telefono1,
                    "Telefono2":rows[0].Telefono2,
                    "Habilitado": rows[0].Habilitado == 0 ? true : false
                }
                console.log(data);
            }
            
            res.status(200).json(data);
        })
        .catch((err) => { res.status(500).json(err)});
}

export function getUsersService(req, res)
{
    var query = `SELECT * FROM Usuarios`;

    pool.promise().query(query)
        .then(([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
        .catch((err) => { res.status(500).json(err)});
        
}

export function getUserService(req, res)
{

    var query = `SELECT * FROM usuarios WHERE ID = ?`
    var idUsuario = req.body.IDUsuario;

    pool.promise().query(query, [idUsuario])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.status(200).json(rows);
            })
            .catch((err) => { res.status(500).json(err)});
}

export function addUserService(req, res)
{
    var Usuario = req.body;

    var query =  `INSERT INTO usuarios SET ?`

    console.log(query);
    pool.promise().query(query, [Usuario])
        .then( ([rows,fields]) => {
            res.status(200).json({'Mensaje':"Ok."})
        })
        .catch((err) => { res.status(500).json(err)});
}

export function updateUserService(req, res)
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
    pool.promise().query(query, [Usuario])
        .then( ([rows,fields]) => {
            res.status(200).json({'Mensaje':"Se actualizo correctamente el Usuario."})
        })
        .catch((err) => { res.status(500).json(err)});
}

export function deleteUserService(req, res)
{
    var UserId = req.body.Id;

    var query = `DELETE FROM  [dbo].[usuarios]
                WHERE [ID] = ?`; 

    pool.promise().query(query, [UserId])
        .then( ([rows,fields]) => {
            res.status(200).json({'Mensaje':"Se elimino correctamente el Usuario."})
        })
        .catch((err) => { res.status(500).json(err)});
}
