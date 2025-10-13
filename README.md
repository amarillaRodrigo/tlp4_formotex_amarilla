# 🖥️ Gestión de Inventario - FORMOTEX

API REST para la gestión de inventario de equipos informáticos desarrollada con Node.js, TypeScript, Express y MongoDB.

## 🚀 Requisitos Previos

- Node.js 18+
- MongoDB 6.0+
- npm 9+

## 🔧 Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno basandose en .env.example
4. Iniciar servidor en desarrollo

## Uso

## Autenticacion

### 1. Iniciar sesión (Público)
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "admin@formotex.local",
  "password": "tu_contraseña"
}

### 2. Registrar usuario (Solo ADMIN)
POST http://localhost:4000/api/auth/register
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "email": "nuevo@formotex.local",
  "password": "contraseña123",
  "fullName": "Nuevo Usuario",
  "role": "USER"
}

### 3. Registro de administrador (Protegido)
POST http://localhost:4000/api/auth/admin/register
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "email": "admin2@formotex.local",
  "password": "admin123",
  "fullName": "Admin 2",
  "role": "ADMIN"
}

## 2. Usuarios

### 1. Obtener perfil
GET http://localhost:4000/api/users/me
Authorization: Bearer <token>

### 2. Listar todos los usuarios (Solo ADMIN)
GET http://localhost:4000/api/users
Authorization: Bearer <admin_token>

## 3. Equipos

### 1. Listar equipos
GET http://localhost:4000/api/equipment
Authorization: Bearer <token>

### 2. Obtener equipo por ID
GET http://localhost:4000/api/equipment/:id
Authorization: Bearer <token>

### 3. Crear equipo (Solo ADMIN)
POST http://localhost:4000/api/equipment
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "assetTag": "NB-001",
  "serialNumber": "SN12345",
  "brand": "Dell",
  "model": "XPS 15",
  "category": "Laptop",
  "status": "IN_STOCK"
}

### 4. Actualizar equipo (Solo ADMIN)
PUT http://localhost:4000/api/equipment/:id
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "status": "ASSIGNED"
}

### 5. Eliminar equipo (Solo ADMIN)
DELETE http://localhost:4000/api/equipment/:id
Authorization: Bearer <admin_token>

### 6. Asignar equipo a usuario
POST http://localhost:4000/api/equipment/:id/assign
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "userId": "usuario_id"
}


## 4. Ubicaciones

### 1. Listar ubicaciones
GET http://localhost:4000/api/locations
Authorization: Bearer <token>

### 2. Crear ubicación (Solo ADMIN)
POST http://localhost:4000/api/locations
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "code": "OFI-01",
  "name": "Oficina Principal"
}

### 3. Transferir equipo a ubicación
POST http://localhost:4000/api/equipment/:id/transfer
Content-Type: application/json
Authorization: Bearer <token>

{
  "locationId": "ubicacion_id"
}


**Docker Compose**
- Copiar `./.env.example` a `./.env` y ajustar valores.
- Construir y levantar los servicios: `docker compose up --build -d`
- Verificar salud: `http://localhost:4000/api/health`
- Detener servicios: `docker compose down`
- Datos de Mongo se guardan en el volumen `mongo_data`.

**Postman**
- Importar colección: `postman/FORMOTEX.postman_collection.json`.
- Importar entorno: `postman/FORMOTEX-local.postman_environment.json` y seleccionarlo como entorno activo para que las solicitudes HTTP funcionen.
- Ejecutar `Auth / Login (Admin)`; el test guarda automáticamente `token` en el entorno.
- Usar endpoints protegidos (heredan Bearer `{{token}}`):
  - `Users / Me`, `Users / List (ADMIN)`
  - `Equipment` (listar, crear, actualizar, asignar, transferir)
  - `Locations` (listar, crear)
- Variables útiles en el entorno: `equipmentId`, `userId`, `locationId` (ajustar para requests por ID).
