const express = require("express");
const router = express.Router();

const {
    obtenerDepartamentos,
    agregarDepartamento,
    actualizarDepartamento,
    eliminarDepartamento,
    verEmpleadosPorDepartamento
} = require("../controllers/departamentoController");


router.post("/departamentos/buscar", obtenerDepartamentos);
router.post("/departamentos", agregarDepartamento);
router.put("/departamentos", actualizarDepartamento);
router.delete("/departamentos", eliminarDepartamento);
router.post("/empleados-departamentos", verEmpleadosPorDepartamento);

module.exports = router;
