# Tarea 1 - API

## Nombre y carné

**Maikel Flores Navarro - 2024148346**

## Estado del proyecto

**Completado y funcional**

## Enlace del video

[Ver video en YouTube](https://youtu.be/jK8Q1JweSYU)

---

## Introducción

El objetivo de esta tarea es desarrollar una API REST que permita la comunicación con una base de datos SQL Server utilizando Node.js.

Se utilizó la base de datos **AdventureWorks2025** y se implementaron operaciones CRUD mediante procedimientos almacenados.

Además, se implementó una consulta utilizando `JOIN` entre diferentes tablas.

La solución se ejecuta mediante Docker utilizando dos contenedores Linux independientes:

- SQL Server 2025.
- API desarrollada con Node.js y Express.

Ambos contenedores se comunican mediante una red interna de Docker.

---

## Requerimientos

Para ejecutar el proyecto es necesario tener instalado:

- Docker Desktop
- Git
- SQL Server Management Studio (opcional)
- Postman (opcional)

Node.js se ejecuta dentro de un contenedor Docker, por lo que no es necesario instalarlo directamente en Windows.

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/MaikelFn/Tarea1-API.git
```

Ingresar a la carpeta del proyecto:

```bash
cd Tarea1-API/codigo
```

---

## 2. SQL Server

El proyecto utiliza la imagen:

```text
mcr.microsoft.com/mssql/server:2025-latest
```

El contenedor de SQL Server utilizado se llama:

```text
sqlserverlinux
```

La base de datos utilizada es:

```text
AdventureWorks2025
```

SQL Server utiliza el puerto interno `1433` y se encuentra publicado en Windows mediante el puerto `1435`.

---

## 3. Procedimientos almacenados

Ejecutar el script:

```text
Script sql/crud_departamentos.sql
```

Este archivo contiene los procedimientos almacenados necesarios para las operaciones CRUD y las consultas de la API.

---

## 4. Crear la red de Docker

```bash
docker network create tarea1-network
```

Conectar el contenedor de SQL Server:

```bash
docker network connect tarea1-network sqlserverlinux
```

---

## 5. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `codigo`:

```env
DB_USER=sa
DB_PASSWORD=CONTRASEÑA
DB_SERVER=sqlserverlinux
DB_PORT=1433
DB_DATABASE=AdventureWorks2025
```

---

## 6. Construir la imagen de la API

```bash
docker build -t tarea1-api .
```

---

## 7. Crear el contenedor de la API

```bash
docker run -d --name tarea1-api --network tarea1-network -p 3000:3000 --env-file .env tarea1-api
```

---

## 8. Verificar los contenedores

```bash
docker ps
```

Deben aparecer los contenedores:

```text
sqlserverlinux
tarea1-api
```

Después de haber creado los contenedores por primera vez, pueden iniciarse nuevamente con:

```bash
docker start sqlserverlinux
docker start tarea1-api
```

También pueden iniciarse directamente desde Docker Desktop.

---

# Ejecución

La API se encuentra disponible en:

```text
http://localhost:3000
```

---

# Servicios

## Buscar departamentos

```http
POST /departamentos/buscar
```

## Agregar departamento

```http
POST /departamentos
```

## Actualizar departamento

```http
PUT /departamentos
```

## Eliminar departamento

```http
DELETE /departamentos
```

## Ver empleados por departamento

```http
POST /empleados-departamentos
```

Esta consulta utiliza `JOIN` para obtener empleados según su departamento.

---

# Datos de prueba

## Agregar departamento

**Endpoint:**

```text
POST http://localhost:3000/departamentos
```

**Body JSON:**

```json
{
  "Name": "Departamento Prueba",
  "GroupName": "Grupo Prueba"
}
```

---

## Buscar departamento

**Endpoint:**

```text
POST http://localhost:3000/departamentos/buscar
```

**Body JSON:**

```json
{
  "DepartmentID": null,
  "Name": "Engineering",
  "GroupName": null
}
```

---

## Actualizar departamento

**Endpoint:**

```text
PUT http://localhost:3000/departamentos
```

**Body JSON:**

```json
{
  "DepartmentID": 17,
  "Name": "Departamento Actualizado",
  "GroupName": "Grupo Actualizado"
}
```

---

## Eliminar departamento

**Endpoint:**

```text
DELETE http://localhost:3000/departamentos
```

**Body JSON:**

```json
{
  "DepartmentID": 17
}
```

---

## Ver empleados por departamento

**Endpoint:**

```text
POST http://localhost:3000/empleados-departamentos
```

**Body JSON:**

```json
{
  "Departamento": "Sales",
  "Nombre": null,
  "Apellido": null
}
```

---

# Tecnologías utilizadas

- Node.js
- Express
- SQL Server 2025
- AdventureWorks2025
- Docker
- Linux
- Stored Procedures
- REST API
- Postman