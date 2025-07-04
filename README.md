# Panel NodeJS - API REST

API REST desarrollada con NestJS siguiendo principios de Clean Architecture y Domain-Driven Design.

## 🚀 Tecnologías

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript 5.x
- **Base de Datos**: PostgreSQL 15.x
- **ORM**: TypeORM
- **Validación**: class-validator, class-transformer
- **Documentación**: Swagger/OpenAPI
- **Testing**: Jest
- **Containerización**: Docker & Docker Compose

## 🏗️ Patrones de Diseño

### Clean Architecture
```
src/
├── domain/           # Reglas de negocio y entidades
├── application/      # Casos de uso y servicios
├── infrastructure/   # Controllers, repositories, config
└── dto/             # Data Transfer Objects
```

### Domain-Driven Design (DDD)
- **Entities**: Representan objetos del dominio con identidad
- **Value Objects**: Objetos inmutables sin identidad
- **Repositories**: Abstracción para acceso a datos
- **Services**: Lógica de negocio compleja

### Repository Pattern
- Interfaz en dominio: `ICustomerRepository`
- Implementación en infraestructura: `CustomerRepository`
- Inyección de dependencias con tokens

### DTO Pattern
- **Create DTOs**: Para validación de entrada
- **Response DTOs**: Para serialización de salida
- **Update DTOs**: Para actualizaciones parciales

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- Docker & Docker Compose
- PostgreSQL 15+

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd panel-nodejs
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar base de datos**
```bash
# Levantar PostgreSQL con Docker
docker-compose up -d

# Ejecutar migraciones (si existen)
npm run migration:run
```

4. **Variables de entorno**
```bash
# Crear .env basado en .env.example
cp .env.example .env

# Configurar variables
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=panel_db
```

5. **Ejecutar la aplicación**
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

La API estará disponible en: `http://localhost:8080`

## 🛠️ Scripts disponibles

```bash
# Desarrollo
npm run start:dev          # Servidor con hot reload
npm run start:debug        # Servidor con debug

# Producción
npm run build             # Compilar TypeScript
npm run start:prod        # Ejecutar compilado

# Testing
npm run test              # Tests unitarios
npm run test:e2e          # Tests end-to-end
npm run test:cov          # Tests con coverage

# Base de datos
npm run migration:generate # Generar migración
npm run migration:run     # Ejecutar migraciones
npm run migration:revert  # Revertir migración
```

## 📚 API Endpoints - Customer

### Base URL
```
http://localhost:8080/api/customers
```

### 1. Crear Cliente
```bash
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan",
    "lastname": "Pérez",
    "dni": "12345678",
    "address": "Av. Principal 123, Lima",
    "numberPhone": "+51 999 888 777",
    "email": "juan.perez@email.com"
  }'
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "name": "Juan",
  "lastname": "Pérez",
  "dni": "12345678",
  "address": "Av. Principal 123, Lima",
  "numberPhone": "+51 999 888 777",
  "email": "juan.perez@email.com"
}
```

### 2. Obtener todos los clientes
```bash
curl -X GET http://localhost:8080/api/customers
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "name": "Juan",
    "lastname": "Pérez",
    "dni": "12345678",
    "address": "Av. Principal 123, Lima",
    "numberPhone": "+51 999 888 777",
    "email": "juan.perez@email.com"
  }
]
```

### 3. Obtener cliente por ID
```bash
curl -X GET http://localhost:8080/api/customers/1
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "name": "Juan",
  "lastname": "Pérez",
  "dni": "12345678",
  "address": "Av. Principal 123, Lima",
  "numberPhone": "+51 999 888 777",
  "email": "juan.perez@email.com"
}
```

### 4. Actualizar cliente
```bash
curl -X PUT http://localhost:8080/api/customers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos",
    "email": "juan.carlos@email.com"
  }'
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "name": "Juan Carlos",
  "lastname": "Pérez",
  "dni": "12345678",
  "address": "Av. Principal 123, Lima",
  "numberPhone": "+51 999 888 777",
  "email": "juan.carlos@email.com"
}
```

### 5. Eliminar cliente
```bash
curl -X DELETE http://localhost:8080/api/customers/1
```

**Respuesta exitosa (200):** Sin contenido

## ⚠️ Validaciones y Errores

### Validaciones de entrada
- **DNI**: Exactamente 8 dígitos numéricos
- **Email**: Formato válido y único
- **Nombre/Apellido**: 2-50 caracteres
- **Dirección**: 10-200 caracteres
- **Teléfono**: 7-15 caracteres con formato válido

### Ejemplo de error de validación
```bash
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J",
    "dni": "123456789",
    "email": "invalid-email"
  }'
```

**Respuesta de error (400):**
```json
{
  "statusCode": 400,
  "message": "Error de validación",
  "errors": [
    "El nombre debe tener entre 2 y 50 caracteres",
    "El DNI debe tener exactamente 8 dígitos",
    "El email debe tener un formato válido"
  ]
}
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Tests con coverage
npm run test:cov

# Tests end-to-end
npm run test:e2e

# Tests en modo watch
npm run test:watch
```

## 📁 Estructura del Proyecto

```
src/
├── customer/                    # Módulo de clientes
│   ├── domain/                 # Dominio
│   │   ├── entities/           # Entidades
│   │   └── interfaces/         # Interfaces del repositorio
│   ├── application/            # Aplicación
│   │   └── service/            # Servicios de aplicación
│   ├── infrastructure/         # Infraestructura
│   │   ├── controllers/        # Controladores REST
│   │   └── repositories/       # Implementación de repositorios
│   └── dto/                   # Data Transfer Objects
├── common/                     # Código compartido
│   └── utils/                  # Utilidades
├── app.module.ts              # Módulo principal
└── main.ts                    # Punto de entrada
```

## 🔧 Configuración

### Base de datos
```typescript
// src/app.module.ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo en desarrollo
})
```

### Validación global
```typescript
// src/main.ts
app.useGlobalPipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: validationExceptionFactory,
}));
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.


