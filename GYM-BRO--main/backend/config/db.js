import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sena',
    database: 'gym_bro',
    waitForConnections: true,
    connectionLimit: 10,
});