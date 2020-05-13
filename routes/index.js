import { getUsers, getUser, addUser, updateUser, deleteUser, loginUser, cambiarContrasenia, loginGoogle } from './userRoutes'
import { getTipoClase, addTipoClase, updateTipoClase, deleteTipoClase } from './tipoClaseRoutes'
import { getSubscipcion, addSubscipcion, updateSubscipcion, deleteSubscipcion } from './subscripcionRoutes'
import { getComentario, addComentario, updateComentario, deleteComentario } from './comentarioRoutes'
import * as AdminRoutes from './adminRoutes'
import * as ClaseRoutes from './claseRoutes';
import { checkToken } from '../auth/token_validation';


module.exports = function (app, passport) {
    app.route('/users/')
        .get(checkToken, AdminRoutes.getAllUsers)
        .post(addUser)
        .put(checkToken, updateUser)
        .delete(checkToken, deleteUser);

    app.route('/user?:Id/', checkToken)
        .get(checkToken, getUser);

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
        .get(AdminRoutes.getCategoriaClase)
        .post(AdminRoutes.addCategoriaClase)
        .put(AdminRoutes.updateCategoriaClase)
        .delete(AdminRoutes.deleteCategoriaClase);

    app.route('/habilitarClase/')
        .post(checkToken, ClaseRoutes.habilitarClase);

    app.route('/deshabilitarClase/')
        .post(checkToken, ClaseRoutes.deshabilitarClase);

    app.route('/claseubicacion/')
        .get(checkToken, ClaseRoutes.getClaseByUbicacion);

    app.route('/clasesdistancia/')
        .post(checkToken, ClaseRoutes.getClasesDistanciaFiltro);

    app.route('/clase?:IdProfesor/')
        .get(checkToken, ClaseRoutes.getClaseByProfesor);

    app.route('/clase/')
        .post(checkToken, ClaseRoutes.addClase);

    app.route('/actualizarClase/')
        .put(checkToken, ClaseRoutes.updateClase)

    app.route('/borrarClase/')
        .delete(checkToken, ClaseRoutes.deleteClase)
}