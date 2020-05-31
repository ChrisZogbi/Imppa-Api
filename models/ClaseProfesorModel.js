import { Model } from 'sequelize'
import { sequelize } from '../services/index'
import { UserType } from './TipoUsuarioModel';
import { UserSubcription } from './SubscripcionModel';
const Sequelize = require('sequelize');

export class UserClass extends Model { }
UserClass.init({
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: Sequelize.INTEGER, allowNull: false },
    claseprofesorId: { type: Sequelize.INTEGER, allowNull: false },
}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'clasexusuario' })

export class Class extends Model { }
Class.init({
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    categoriaclaseId: { type: Sequelize.INTEGER, allowNull: false },
    tipoclaseId: { type: Sequelize.INTEGER, allowNull: false },
    Precio: Sequelize.INTEGER,
    Latitud: Sequelize.FLOAT,
    Longitud: Sequelize.FLOAT,
    Hablitada: { type: Sequelize.STRING, allowNull: false }

}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'claseprofesor' })

UserClass.hasOne(Class, { as: 'Clase', foreignKey: 'ID', sourceKey: 'claseprofesorId' })

