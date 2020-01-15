import { createPool } from 'mysql2';

export const pool = createPool({
    user: 'ImppaTest',
    password: 'Lagash2016',
    port: '3306',
    host: '107.180.44.147',
    database : "Imppa" 
});


