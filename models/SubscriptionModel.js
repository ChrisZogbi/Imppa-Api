import { Model } from 'sequelize'
import { sequelize } from '../services/index'
const Sequelize = require('sequelize');

export class UserSubcription extends Model { }
UserSubcription.init({
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: Sequelize.INTEGER, allowNull: false },
    subscripcionId: { type: Sequelize.INTEGER, allowNull: false },
}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'subscripcionusuario' })

export class Subcription extends Model { }
Subcription.init({
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Nombre: { type: Sequelize.STRING, allowNull: false },
    Descripcion: { type: Sequelize.STRING, allowNull: false },
    Precio: { type: Sequelize.INTEGER, allowNull: false },
    CantClases: { type: Sequelize.INTEGER, allowNull: false },
}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'subscripcion' })

UserSubcription.hasOne(Subcription, { foreignKey: 'ID', sourceKey: 'subscripcionId' })
