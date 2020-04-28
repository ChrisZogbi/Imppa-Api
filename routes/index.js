import { getUsers, getUser, addUser, updateUser, deleteUser, loginUser, cambiarContrasenia, loginGoogle } from './userRoutes'
import { getTipoUsuario, addTipoUsuario, updateTipoUsuario, deleteTipoUsuario } from './tipoUsuarioRoutes'
import { getTipoClase, addTipoClase, updateTipoClase, deleteTipoClase } from './tipoClaseRoutes'
import { getSubscipcion, addSubscipcion, updateSubscipcion, deleteSubscipcion } from './subscripcionRoutes'
import { getComentario, addComentario, updateComentario, deleteComentario } from './comentarioRoutes'
import { getCategoriaClase, addCategoriaClase, updateCategoriaClase, deleteCategoriaClase } from './categoriaClaseRoutes'
import * as ClaseRoutes from './claseRoutes';
import { checkToken } from '../auth/token_validation';


module.exports = function (app, passport) {
    app.route('/users/')
        .get(checkToken, getUsers)
        .post(checkToken, addUser)
        .put(checkToken, updateUser)
        .delete(checkToken, deleteUser);

    app.route('/user?:Id/', checkToken)
        .get(checkToken, getUser);

    app.route('/login/')
        .post(loginUser);

    // app.get('/auth/google/',
    //     passport.authenticate('google', { scope: ['profile'] }));

    // // GET /auth/google/callback
    // //   Use passport.authenticate() as route middleware to authenticate the
    // //   request.  If authentication fails, the user will be redirected back to the
    // //   login page.  Otherwise, the primary route function function will be called,
    // //   which, in this example, will redirect the user to the home page.
    // app.get('/auth/google/callback/',
    //     passport.authenticate('google', { failureRedirect: '/login' }),
    //     loginGoogle);

    app.route('/login/oauth/google/')
        .post((req, res, next) => {
            passport.authenticate('googleToken', (err, user, info) => {
            loginGoogle(user, res);
        })(req, res, next)});

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