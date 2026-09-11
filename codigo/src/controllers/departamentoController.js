const { sql, conectarDB } = require("../config/db");

async function obtenerDepartamentos(req, res) {
    try {
        const pool = await conectarDB();

        const resultado = await pool
            .request()
            .execute("VerDepartamentos");

        res.json(resultado.recordset);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener los departamentos"
        });
    }
}

module.exports = {
    obtenerDepartamentos
};
