const { sql, conectarDB } = require("../config/db");

/**
 * Obtiene departamentos aplicando filtros opcionales.
 *
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
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

/**
 * Agrega un nuevo departamento.
 *
 * @param {Object} req - Solicitud HTTP con Name y GroupName.
 * @param {Object} res - Respuesta HTTP.
 */
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

/**
 * Actualiza la información de un departamento existente.
 *
 * @param {Object} req - Solicitud HTTP con DepartmentID, Name y GroupName.
 * @param {Object} res - Respuesta HTTP.
 */
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

/**
 * Elimina un departamento utilizando su identificador.
 *
 * @param {Object} req - Solicitud HTTP con DepartmentID.
 * @param {Object} res - Respuesta HTTP.
 */
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

/**
 * Obtiene los empleados asociados a cada departamento,
 * aplicando filtros opcionales por departamento, nombre y apellido.
 *
 * @param {Object} req - Solicitud HTTP con los filtros de búsqueda.
 * @param {Object} res - Respuesta HTTP.
 */
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

/**
 * Exporta los controladores para ser utilizados por las rutas de la API.
 */
module.exports = {
    obtenerDepartamentos,
    agregarDepartamento,
    actualizarDepartamento,
    eliminarDepartamento,
    verEmpleadosPorDepartamento
};