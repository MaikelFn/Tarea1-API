USE AdventureWorks2025;
GO

-- Agrega un nuevo departamento
CREATE PROCEDURE AgregarDepartamento
    @Name NVARCHAR(50),
    @GroupName NVARCHAR(50)
AS
    INSERT INTO HumanResources.Department
        (Name, GroupName, ModifiedDate)
    VALUES
        (@Name, @GroupName, GETDATE());
GO

-- Busca departamentos según los parámetros indicados
CREATE PROCEDURE VerDepartamentos
    @DepartmentID SMALLINT = NULL,
    @Name NVARCHAR(50) = NULL,
    @GroupName NVARCHAR(50) = NULL
AS
    SELECT
        DepartmentID,
        Name,
        GroupName,
        ModifiedDate
    FROM HumanResources.Department
    WHERE
        (@DepartmentID IS NULL OR DepartmentID = @DepartmentID)
        AND (@Name IS NULL OR Name = @Name)
        AND (@GroupName IS NULL OR GroupName = @GroupName);
GO

-- Actualiza los datos de un departamento
CREATE PROCEDURE ActualizarDepartamento
    @DepartmentID SMALLINT,
    @Name NVARCHAR(50),
    @GroupName NVARCHAR(50)
AS
    UPDATE HumanResources.Department
    SET
        Name = @Name,
        GroupName = @GroupName,
        ModifiedDate = GETDATE()
    WHERE DepartmentID = @DepartmentID;
GO

-- Elimina un departamento según su ID
CREATE PROCEDURE EliminarDepartamento
    @DepartmentID SMALLINT
AS
    DELETE FROM HumanResources.Department
    WHERE DepartmentID = @DepartmentID;
GO

-- Muestra empleados junto con el departamento al que pertenecen
CREATE PROCEDURE VerEmpleadosPorDepartamento
    @Departamento NVARCHAR(50) = NULL,
    @Nombre NVARCHAR(50) = NULL,
    @Apellido NVARCHAR(50) = NULL
AS
    SELECT
        d.Name AS Departamento,
        p.FirstName AS Nombre,
        p.MiddleName AS SegundoNombre,
        p.LastName AS Apellido,
        edh.StartDate AS FechaIngresoDepartamento
    FROM HumanResources.EmployeeDepartmentHistory edh
    INNER JOIN HumanResources.Department d
        ON edh.DepartmentID = d.DepartmentID
    INNER JOIN Person.Person p
        ON edh.BusinessEntityID = p.BusinessEntityID
    WHERE
        edh.EndDate IS NULL
        AND (@Departamento IS NULL OR d.Name = @Departamento)
        AND (@Nombre IS NULL OR p.FirstName = @Nombre)
        AND (@Apellido IS NULL OR p.LastName = @Apellido)
    ORDER BY d.Name, p.FirstName, p.LastName;
GO