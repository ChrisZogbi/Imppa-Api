import { Model } from 'sequelize'
import { sequelize } from '../services/index'
import { User } from './UserModel';
import { Class } from './ClassModel';
const Sequelize = require('sequelize');

export class UserComment extends Model { }
UserComment.init({
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    profesorId: { type: Sequelize.INTEGER, allowNull: false },
    alumnoId: { type: Sequelize.INTEGER, allowNull: false },
    claseId: { type: Sequelize.INTEGER, allowNull: false },
    Comentario: { type: Sequelize.STRING, allowNull: false },
    Puntaje: { type: Sequelize.INTEGER, allowNull: false },
}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'comentarios' })

UserComment.hasOne(User, {  as: 'Profesor', foreignKey: 'ID', sourceKey: 'profesorId' });
UserComment.hasOne(User, {  as: 'Alumno', foreignKey: 'ID', sourceKey: 'alumnoId' });
UserComment.hasOne(Class, {  as: 'Clase', foreignKey: 'ID', sourceKey: 'claseId' });