# Core Integration Hexagonal Microservice

Este proyecto implementa una arquitectura de microservicios basada en el patrón **Hexagonal Architecture** utilizando **NestJS**. Está diseñado para ser modular, escalable y fácil de mantener.

---

## 🚀 Características

- **Arquitectura Hexagonal**: Separación clara entre dominio, infraestructura y adaptadores.
- **NestJS Framework**: Framework progresivo para construir aplicaciones Node.js eficientes y escalables.
- **Autenticación JWT**: Implementación de autenticación segura con Passport y JWT.
- **MongoDB**: Base de datos NoSQL para almacenamiento persistente.
- **Swagger**: Documentación interactiva de la API.
- **Docker**: Contenedores para facilitar el despliegue.
- **Configuración Centralizada**: Uso de `@nestjs/config` para manejar variables de entorno.

---

## 📂 Estructura del Proyecto

```plaintext
core-integration-hexagonal-microservice/
├── .env                     # Variables de entorno
├── docker-compose.yml       # Configuración de Docker Compose
├── src/                     # Código fuente principal
│   ├── app.module.ts        # Módulo raíz de la aplicación
│   ├── main.ts              # Punto de entrada de la aplicación
│   ├── auth/                # Módulo de autenticación
│   │   ├── domain/          # Lógica de negocio y casos de uso
│   │   ├── infrastructure/  # Controladores, DTOs y adaptadores
│   │   └── auth.module.ts   # Configuración del módulo de autenticación
│   ├── common/              # Decoradores, middlewares y utilidades compartidas
│   ├── config/              # Configuración de la aplicación
│   ├── database/            # Configuración de la base de datos
│   └── products/            # Módulo de productos
│       ├── domain/          # Lógica de negocio y casos de uso
│       ├── infrastructure/  # Controladores, DTOs y adaptadores
│       └── product.module.ts # Configuración del módulo de productos
├── test/                    # Pruebas end-to-end
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Documentación del proyecto
```

---

## 🛠️ Instalación

Clona el repositorio:

```bash
git clone https://github.com/miltonaxl/core-integration-hexagonal.git
cd core-integration-hexagonal-microservice
```

Instala las dependencias:

```bash
npm install
```

Configura las variables de entorno en el archivo `.env`:

```env
PORT=3000
MONGO_HOST=localhost
MONGO_USER=root
MONGO_PASSWORD=example
MONGO_PORT=27018
MONGO_DB=core_db
JWT_SECRET=secret
JWT_EXPIRES_IN=3600
```

Inicia la aplicación:

```bash
npm run start
```

---

## 🐳 Uso con Docker

Construye y levanta los contenedores:

```bash
docker-compose up --build -d
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 📖 Documentación de la API

La documentación de la API está disponible en Swagger. Una vez que la aplicación esté en ejecución, accede a:

[http://localhost:3000/api](http://localhost:3000/api)

---

## 📌 Endpoints principales

### 🔐 Autenticación

- **POST** `/auth/register` - Registro de usuarios.
- **POST** `/auth/login` - Inicio de sesión.

### 🛍️ Productos

- **GET** `/products` - Obtiene la lista de productos.
- **POST** `/products` - Crea un nuevo producto.
- **PUT** `/products/:id` - Actualiza un producto (solo el propietario).
- **DELETE** `/products/:id` - Inactiva un producto (solo el propietario).

---

## 🧪 Pruebas

Ejecuta las pruebas unitarias:

```bash
npm run test
```

Ejecuta las pruebas end-to-end:

```bash
npm run test:e2e
```

---

## 📚 Tecnologías Utilizadas

- **NestJS**: Framework principal.
- **MongoDB**: Base de datos NoSQL.
- **Passport**: Autenticación con JWT.
- **Swagger**: Documentación interactiva de la API.
- **Docker**: Contenedores para despliegue.
- **Jest**: Framework de pruebas.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request.

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.

---

## ✨ Autor

Desarrollado por **Milton**.
