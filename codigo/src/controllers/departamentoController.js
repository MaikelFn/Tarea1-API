const { sql, conectarDB } = require("../config/db");

async function obtenerDepartamentos(req, res) {
    try {
        const { DepartmentID, Name, GroupName } = req.body;

        const pool = await conectarDB();

        const resultado = await pool
            .request()
            .input("DepartmentID", sql.SmallInt, DepartmentID || null)
            .input("Name", sql.NVarChar(50), Name || null)
            .input("GroupName", sql.NVarChar(50), GroupName || null)
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

async function eliminarDepartamento(req, res) {
    try {
        const { DepartmentID } = req.body;

        const pool = await conectarDB();

        await pool
            .request()
            .input("DepartmentID", sql.SmallInt, DepartmentID)
            .execute("EliminarDepartamento");

        res.json({
            mensaje: "Departamento eliminado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al eliminar el departamento"
        });
    }
}

async function verEmpleadosPorDepartamento(req, res) {
    try {
        const { Departamento, Nombre, Apellido } = req.body;

        const pool = await conectarDB();

        const resultado = await pool
            .request()
            .input("Departamento", sql.NVarChar(50), Departamento || null)
            .input("Nombre", sql.NVarChar(50), Nombre || null)
            .input("Apellido", sql.NVarChar(50), Apellido || null)
            .execute("VerEmpleadosPorDepartamento");

        res.json(resultado.recordset);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener los empleados por departamento"
        });
    }
}

module.exports = {
    obtenerDepartamentos,
    agregarDepartamento,
    actualizarDepartamento,
    eliminarDepartamento,
    verEmpleadosPorDepartamento
};