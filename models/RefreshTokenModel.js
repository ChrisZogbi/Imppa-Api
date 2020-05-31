import { Model } from 'sequelize'
import { sequelize } from '../services/index'
import { User } from './UserModel';
const Sequelize = require('sequelize');

export class RefreshToken extends Model { }
RefreshToken.init({
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: Sequelize.INTEGER, allowNull: false },
    Token: { type: Sequelize.STRING, allowNull: false },
    Habilitado: { type: Sequelize.BOOLEAN, allowNull: false },
}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'logerrores' })

RefreshToken.hasOne(User, {  as: 'Usuario', foreignKey: 'ID', sourceKey: 'usuarioId' });