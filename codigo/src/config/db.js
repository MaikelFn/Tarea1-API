const sql = require("mssql");
require("dotenv").config();

/**
 * Configuración de la conexión a SQL Server.
 * Los datos de conexión se obtienen desde las variables de entorno.
 */
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,

    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

/**
 * Establece la conexión con SQL Server.
 *
 * @returns {Promise<sql.ConnectionPool>} Pool de conexión a la base de datos.
 */
async function conectarDB() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Exporta la librería de SQL Server y la función de conexión
 * para que puedan ser utilizadas en los demás módulos del proyecto.
 */
module.exports = {
    sql,
    conectarDB
};