const express = require("express");
const router = express.Router();

const {
    obtenerDepartamentos
} = require("../controllers/departamentoController");

router.get("/departamentos", obtenerDepartamentos);

module.exports = router;
