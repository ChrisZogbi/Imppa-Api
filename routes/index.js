import { getUsers, getUser, addUser, updateUser, deleteUser, loginUser, cambiarContrasenia, loginGoogle } from './userRoutes'
import { getTipoClase, addTipoClase, updateTipoClase, deleteTipoClase } from './tipoClaseRoutes'
import { getComentario, addComentario, updateComentario, deleteComentario } from './comentarioRoutes'
import * as AdminRoutes from './adminRoutes'
import * as ClaseRoutes from './claseRoutes';
import { checkToken } from '../auth/token_validation';


module.exports = function (app, passport) {
    app.route('/users/')
        // .get(checkToken, AdminRoutes.getAllUsers)
        // .post(addUser)
        // .put(checkToken, updateUser)
        // .delete(checkToken, deleteUser);
        .get(AdminRoutes.getAllUsers)
        .post(addUser)
        .put(updateUser)
        .delete(deleteUser);

    app.route('/user?:Id/', checkToken)
        //.get(checkToken, getUser);
        .get(getUser);

    app.route('/login/')
        .post(loginUser);

    app.route('/login/oauth/google/')
        .post(loginGoogle)

    app.route('/cambioContrasenia/')
        .put(checkToken, cambiarContrasenia);

    app.route('/tipoUsuario/')
        .get(AdminRoutes.getTipoUsuario)
        .post(AdminRoutes.addTipoUsuario)
        .put(AdminRoutes.updateTipoUsuario)
        .delete(AdminRoutes.deleteTipoUsuario);

    app.route('/tipoClase/')
        .get(getTipoClase)
        .post(addTipoClase)
        .put(updateTipoClase)
        .delete(deleteTipoClase);

    app.route('/subscripcion/')
        .get(AdminRoutes.getAllSubscripciones)
        .post(AdminRoutes.addSubscripcion)
        .put(AdminRoutes.updateSubscripcion)
        .delete(AdminRoutes.deleteSubscripcion);

    app.route('/comentario/')
        .get(getComentario)
        .post(addComentario)
        .put(updateComentario)
        .delete(deleteComentario);

    app.route('/categoriaClase/')
        .get(AdminRoutes.getCategoriaClase)
        .post(AdminRoutes.addCategoriaClase)
        .put(AdminRoutes.updateCategoriaClase)
        .delete(AdminRoutes.deleteCategoriaClase);

    app.route('/habilitarClase/')
        //.post(checkToken, ClaseRoutes.habilitarClase);
        .post(ClaseRoutes.habilitarClase);

    app.route('/deshabilitarClase/')
        //.post(checkToken, ClaseRoutes.deshabilitarClase);
        .post(ClaseRoutes.deshabilitarClase);

    app.route('/claseubicacion/')
        //.get(checkToken, ClaseRoutes.getClaseByUbicacion);
        .get(ClaseRoutes.getClaseByUbicacion);


    app.route('/clasesdistancia/')
        .post(checkToken, ClaseRoutes.getClasesDistanciaFiltro);

    app.route('/clase?:IdProfesor/')
        .get(ClaseRoutes.getClaseByProfesor);

    app.route('/clase/')
        .post(ClaseRoutes.addClase);

    app.route('/actualizarClase/')
        .put(checkToken, ClaseRoutes.updateClase)

    app.route('/borrarClase/')
        .delete(ClaseRoutes.deleteClase)
}