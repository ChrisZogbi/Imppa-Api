import { getUsers, getUser, addUser, updateUser, deleteUser, loginUser, cambiarContrasenia } from './userRoutes'
import { getTipoUsuario, addTipoUsuario, updateTipoUsuario, deleteTipoUsuario } from './tipoUsuarioRoutes'
import { getTipoClase, addTipoClase, updateTipoClase, deleteTipoClase } from './tipoClaseRoutes'
import { getSubscipcion, addSubscipcion, updateSubscipcion, deleteSubscipcion } from './subscripcionRoutes'
import { getComentario, addComentario, updateComentario, deleteComentario } from './comentarioRoutes'
import { getCategoriaClase, addCategoriaClase, updateCategoriaClase, deleteCategoriaClase } from './categoriaClaseRoutes'
import * as ClaseRoutes from './claseRoutes';
import * as ClaseController from './categoriaClaseRoutes';
import { checkToken } from '../auth/token_validation';

export function assignRoutes(app) {
    app.route('/users/')
        .get(checkToken, getUsers)
        .post(checkToken,addUser)
        .put(checkToken, updateUser)
        .delete(checkToken, deleteUser);

    app.route('/user?:Id/', checkToken)
        .get(checkToken, getUser);

    app.route('/login/')
        .post(loginUser);

    app.route('/cambioContrasenia/')
        .put(checkToken, cambiarContrasenia);

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
        .post(checkToken, ClaseRoutes.habilitarClase);

    app.route('/deshabilitarClase/')
        .post(checkToken, ClaseRoutes.deshabilitarClase);

    app.route('/claseubicacion/')
        .get(checkToken, ClaseRoutes.getClaseByUbicacion);

    app.route('/clasesdistancia/')
        .get(checkToken, ClaseRoutes.getClasesDistanciaFiltro)


    app.route('/clase?:IdProfesor/')
        .get(checkToken, ClaseRoutes.getClaseByProfesor);

    app.route('/clase/')
        .post(checkToken, ClaseRoutes.addClase);
}