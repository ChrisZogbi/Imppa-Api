import { getUsers, getUser, addUser, updateUser, deleteUser, loginUser, cambiarContrasenia } from './userRoutes'
import { getTipoUsuario, addTipoUsuario, updateTipoUsuario, deleteTipoUsuario } from './tipoUsuarioRoutes'
import { getTipoClase, addTipoClase, updateTipoClase, deleteTipoClase } from './tipoClaseRoutes'
import { getSubscipcion, addSubscipcion, updateSubscipcion, deleteSubscipcion } from './subscripcionRoutes'
import { getComentario, addComentario, updateComentario, deleteComentario } from './comentarioRoutes'
import { getCategoriaClase, addCategoriaClase, updateCategoriaClase, deleteCategoriaClase } from './categoriaClaseRoutes'
import * as ClaseRoutes from './claseRoutes'
import * as ClaseController from './categoriaClaseRoutes'

export function assignRoutes(app) {
    app.route('/users/')
        .get(getUsers)
        .post(addUser)
        .put(updateUser)
        .delete(deleteUser);

    app.route('/user?:Id/')
        .get(getUser);

    app.route('/login/')
        .get(loginUser);

    app.route('/cambioContrasenia/')
        .put(cambiarContrasenia);

    app.route('/tipoUsuario/')
        .get(getTipoUsuario)
        .post(addTipoUsuario)
        .put(updateTipoUsuario)
        .delete(deleteTipoUsuario);

    app.route('/tipoClase/')
        .get(getTipoClase)
        .post(addTipoClase)
        .put(updateTipoClase)
        .delete(deleteTipoClase);

    app.route('/subscripcion/')
        .get(getSubscipcion)
        .post(addSubscipcion)
        .put(updateSubscipcion)
        .delete(deleteSubscipcion);

    app.route('/comentario/')
        .get(getComentario)
        .post(addComentario)
        .put(updateComentario)
        .delete(deleteComentario);

    app.route('/categoriaClase/')
        .get(getCategoriaClase)
        .post(addCategoriaClase)
        .put(updateCategoriaClase)
        .delete(deleteCategoriaClase);

    app.route('/habilitarClase/')
        .post(ClaseRoutes.habilitarClase); 
    
    app.route('/deshabilitarClase/')
        .post(ClaseRoutes.deshabilitarClase); 

    app.route('/claseubicacion/')
        .get(ClaseRoutes.getClaseByUbicacion);
    
    app.route('/clasesdistancia/')
        .get(ClaseRoutes.getClasesDistanciaFiltro)


    app.route('/clase?:IdProfesor/')
        .get(ClaseRoutes.getClaseByProfesor);

    app.route('/clase/')
        .post(ClaseRoutes.addClase);

    
}