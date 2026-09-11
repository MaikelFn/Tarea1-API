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

async function agregarDepartamento(req, res) {
    try {
        const { Name, GroupName } = req.body;

        const pool = await conectarDB();

        await pool
            .request()
            .input("Name", sql.NVarChar(50), Name)
            .input("GroupName", sql.NVarChar(50), GroupName)
            .execute("AgregarDepartamento");

        res.status(201).json({
            mensaje: "Departamento agregado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al agregar el departamento"
        });
    }
}

async function actualizarDepartamento(req, res) {
    try {
        const { DepartmentID, Name, GroupName } = req.body;

        const pool = await conectarDB();

        await pool
            .request()
            .input("DepartmentID", sql.SmallInt, DepartmentID)
            .input("Name", sql.NVarChar(50), Name)
            .input("GroupName", sql.NVarChar(50), GroupName)
            .execute("ActualizarDepartamento");

        res.json({
            mensaje: "Departamento actualizado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar el departamento"
        });
    }
}

module.exports = {
    obtenerDepartamentos,
    agregarDepartamento,
    actualizarDepartamento
};
