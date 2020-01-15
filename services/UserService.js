import app from "../app.js";
import { pool } from "./index";

export function getUserByMailContrasenia (req, res) {
    var query = `SELECT * FROM Usuarios where Mail = ? and Contrasenia = ?`;
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
            
            res.json(data);
        })
        .catch("Error:" + console.log)
}

export function getUsers(req, res)
{
    var query = `SELECT * FROM Usuarios`;

    pool.promise().query(query)
        .then( ([rows,fields]) => {
            console.log(rows);
            res.json(rows);
            })
        .catch(res.json('Se cago todo.'))
}

export function getUser(req, res)
{

    var query = `SELECT * FROM Usuarios WHERE ID = ?`
    var idUsuario = req.body.IDUsuario;

    pool.promise().query(query, [idUsuario])
        .then( ([rows,fields]) => {
            console.log(rows);
            res.json(rows);
            })
        .catch(res.json('Se cago todo.'))
}

export function addUser(req, res)
{
    var Usuario = req.body;

    var query =  `INSERT INTO Usuarios SET ?`

    console.log(query);
    pool.promise().query(query, [Usuario])
        .then( ([rows,fields]) => {
            res.status(200).json("Ok.")
        })
        .catch(console.log)
}

export function updateUser(req, res)
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
            res.status(200).json("Se actualizo correctamente el Usuario.")
        })
        .catch(console.log)
}

export function deleteUser(req, res)
{
    var UserId = req.body.Id;

    var query = `DELETE FROM  [dbo].[Usuarios]
                WHERE [ID] = ?`; 

    pool.promise().query(query, [UserId])
        .then( ([rows,fields]) => {
            res.status(200).json("Se elimino correctamente el Usuario.")
        })
        .catch(console.log)
}
