const express = require("express");
const router = express.Router();

const {
    obtenerDepartamentos,
    agregarDepartamento,
    actualizarDepartamento
} = require("../controllers/departamentoController");

router.get("/departamentos", obtenerDepartamentos);
router.post("/departamentos", agregarDepartamento);
router.put("/departamentos", actualizarDepartamento);

module.exports = router;
