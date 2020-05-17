import app from "../app.js";
import { pool } from "./index";

const selectComentario =  
                            `
                            SELECT 
                                c.ID as IdComentario,
                                up.ID as IdProfesor,
                                up.Nombre as NombreProfesor,
                                up.Apellido as ApellidoProfesor,
                                cp.ID as IdClaseProfesor,
                                cc.NombreCategoria as CategoriaClase,
                                tc.Tipo as TipoClase,
                                ua.ID as IdAlumno,
                                ua.Nombre as NombreAlumno,
                                c.ID as IdComentario,
                                c.Comentario,
                                c.Puntaje
                            FROM comentarios c
                                JOIN usuarios up on c.IDProfesor = up.ID
                                JOIN usuarios ua on c.IDAlumno = ua.ID
                                JOIN claseprofesor cp on cp.ID = c.IDClaseProfesor 
                                JOIN clasexusuario cu on cu.IDUsuario = c.IDProfesor and cu.IDClaseProfesor = cp.ID
                                JOIN categoriaclase cc on cc.ID = cp.IDCategoriaClase
                                JOIN tipoclase tc on tc.ID = cp.IDTipoClase
                            `

export function getComentariosProfesor(idProfesor) {
    var query = ` ${selectComentario} WHERE IDProfesor = ${idProfesor}`;
    
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getComentariosClase(idClaseProfesor) {
    var query = ` ${selectComentario} WHERE cp.ID = ${idClaseProfesor}`;

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getComentarioAlumno(idAlumno) {
    var query = ` ${selectComentario} WHERE IDAlumno = ${idAlumno}`;
    console.log(query);
    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function getComentarioById(idComentario) {
    var query = ` ${selectComentario} WHERE ID = ${idComentario}`

    return pool.promise().query(query)
        .then(([rows]) => { return ({ Success: true, Data: rows }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function addComentario(comentarioData) {
    var query = `
                    INSERT INTO comentarios
                    (
                        IDProfesor,
                        IDAlumno,
                        Comentario,
                        Puntaje,
                        IDClaseProfesor
                    )
                    VALUES
                    (
                        ${comentarioData.IDProfesor},
                        ${comentarioData.IDAlumno},
                        '${comentarioData.Comentario}',
                        ${comentarioData.Puntaje},
                        ${comentarioData.IDClaseProfesor}
                    )
                        `

    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function updateComentario(req, res) {
    var ComentarioData = req.body;

    var query = `UPDATE [comentarios]
                    SET Comentario = ${ComentarioData.Comentario}
                    ,Puntaje = '${ComentarioData.Puntaje}'
                WHERE ID = ${ComentarioData.IdComentario}`;
    console.log(query);
    return pool.promise().query(query)
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}

export function deleteComentario(req, res) {
    var idComentario = req.body.IdComentario;

    var query = `DELETE FROM comentarios
                WHERE[ID = ?`;

    return pool.promise().query(query, [idComentario])
        .then(() => { return ({ Success: true }) })
        .catch((err) => { return ({ Success: false, Data: err }) });
}
