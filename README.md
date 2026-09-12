# Tarea 1 - API

### Nombre y carné de los integrantes:
**Maikel Flores Navarro - 2024148346**

### Estado del proyecto:
**Completado y funcional**

### Enlace del video:
[Ver video en YouTube](https://youtu.be/nPTYzvtTnN4)

Recordar que el video debe ser público para ser visto por el profesor.

---

## Introducción

El objetivo de esta tarea es desarrollar una API que permita la comunicación con una base de datos SQL Server utilizando Node.js.

Se utilizó la base de datos AdventureWorks2025 y se implementaron operaciones CRUD mediante procedimientos almacenados.

Además, se implementó una consulta utilizando JOIN entre diferentes tablas.

## Requerimientos

Para ejecutar el proyecto es necesario tener instalado:

- Docker
- Node.js
- SQL Server
- SQL Server Management Studio
- Postman

## Instalación

1. Clonar el repositorio.

```bash
git https://github.com/MaikelFn/Tarea1-API
```

2. Ingresar a la carpeta del proyecto.

```bash
cd Proyectos/codigo
```

3. Instalar las dependencias.

```bash
npm install
```

4. Crear el archivo `.env`.

```env
DB_USER=USER
DB_PASSWORD=CONTRASEÑA
DB_SERVER=localhost
DB_PORT=PORT
DB_DATABASE=AdventureWorks2025
```

5. Ejecutar los procedimientos almacenados del archivo:

```text
Script sql/crud_departamentos.sql
```

6. Ejecutar la API.

```bash
node src/app.js
```

La API se ejecuta en:

```text
http://localhost:3000
```

## Servicios

### Buscar departamentos

```text
POST /departamentos/buscar
```

### Agregar departamento

```text
POST /departamentos
```

### Actualizar departamento

```text
PUT /departamentos
```

### Eliminar departamento

```text
DELETE /departamentos
```

### Ver empleados por departamento

```text
POST /empleados-departamentos
```

## Datos de prueba

### Agregar departamento

```json
{
  "Name": "Departamento Prueba",
  "GroupName": "Grupo Prueba"
}
```

### Buscar departamento

```json
{
  "DepartmentID": null,
  "Name": "Engineering",
  "GroupName": null
}
```

### Actualizar departamento

```json
{
  "DepartmentID": 17,
  "Name": "Departamento Actualizado",
  "GroupName": "Grupo Actualizado"
}
```

### Eliminar departamento

```json
{
  "DepartmentID": 17
}
```

### Ver empleados por departamento

```json
{
  "Departamento": "Sales",
  "Nombre": null,
  "Apellido": null
}
```