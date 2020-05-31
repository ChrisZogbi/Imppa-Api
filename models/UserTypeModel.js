import { Model } from 'sequelize'
import { sequelize } from '../services/index'
const Sequelize = require('sequelize');

export class UserType extends Model { }
UserType.init({
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Tipo: Sequelize.STRING,
}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'tipousuario' })

