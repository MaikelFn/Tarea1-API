const express = require("express");
const cors = require("cors");

const departamentoRoutes = require("./routes/departamentoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(departamentoRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
