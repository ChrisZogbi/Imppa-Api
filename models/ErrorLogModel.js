import { Model } from 'sequelize'
import { sequelize } from '../services/index'
import { User } from './UserModel';
const Sequelize = require('sequelize');

export class ErrorLog extends Model { }
ErrorLog.init({
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: Sequelize.INTEGER, allowNull: false },
    Fecha: { type: Sequelize.DATE, allowNull: false },
    MensajeError: { type: Sequelize.STRING, allowNull: false },
}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'logerrores' })

ErrorLog.hasOne(User, {  as: 'Usuario', foreignKey: 'ID', sourceKey: 'usuarioId' });