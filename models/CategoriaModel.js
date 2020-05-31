import { Model } from 'sequelize'
import { sequelize } from '../services/index'
const Sequelize = require('sequelize');

export class Category extends Model { }
Category.init({
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Nombre: Sequelize.STRING,
    Habilitado: Sequelize.BOOLEAN,
}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'categoria' })