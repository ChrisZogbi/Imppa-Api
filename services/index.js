import { createPool } from 'mysql2';

// Azure
export const pool = createPool({
    user: 'administrador@imppa-svr',
    password: 'Falopa123',
    port: '3306',
    host: 'imppa-svr.mysql.database.azure.com',
    database : "imppa-svr" ,
    typeCast: function castField( field, useDefaultTypeCasting ) {
		if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {

			var bytes = field.buffer();
			return( bytes[ 0 ] === 1 );
		}

        return( useDefaultTypeCasting() );
    }
});