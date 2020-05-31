import { createPool } from 'mysql2';
const Sequelize = require('sequelize');

// // Azure
export const pool = createPool({
    user: 'administrador@imppa-svr',
    password: 'Falopa123',
    port: '3306',
    host: 'imppa-svr.mysql.database.azure.com',
    database: "imppa-svr",
    typeCast: function castField(field, useDefaultTypeCasting) {
        if ((field.type === "BIT") && (field.length === 1)) {
            var bytes = field.buffer();
            return (bytes[0] === 1);
        }
        return (useDefaultTypeCasting());
    }
});


// Option 1: Passing parameters separately
export const sequelize = new Sequelize('imppa-svr', 'administrador@imppa-svr', 'Falopa123', {
    host: 'imppa-svr.mysql.database.azure.com',
    dialect: 'mysql',
    dialectOptions: {
        encrypt: true
    },
    pool: {
        max: 10,
        idle: 30000,
        acquire: 60000,
        typeCast:
            function castField(field, useDefaultTypeCasting) {
                if ((field.type === "BIT") && (field.length === 1)) {
                    var bytes = field.buffer();
                    return (bytes[0] === 1);
                }
                return (useDefaultTypeCasting());
            }
    }
});