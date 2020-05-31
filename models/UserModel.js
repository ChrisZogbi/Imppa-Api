import { Model } from 'sequelize'
import { sequelize } from '../services/index'
import { UserType } from './TipoUsuarioModel';
import { UserSubcription } from './SubscripcionModel';
const Sequelize = require('sequelize');

export class User extends Model { }
User.init({
  ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  tipousuarioId: Sequelize.INTEGER,
  Mail: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true }, unique: true },
  Contrasenia: { type: Sequelize.STRING, allowNull: true },
  AddedDate: Sequelize.DATE,
  LastLogin: Sequelize.DATE,
  Nombre: { type: Sequelize.STRING, allowNull: false },
  Apellido: { type: Sequelize.STRING, allowNull: false },
  Telefono1: Sequelize.INTEGER,
  Habilitado: Sequelize.BOOLEAN,
  Id_Google: { type: Sequelize.INTEGER, allowNull: true }

}, { freezeTableName: true, sequelize, timestamps: false, modelName: 'usuarios' })

User.belongsTo(UserType);
User.hasOne(UserSubcription);