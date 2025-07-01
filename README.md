# 💰 Control de Gastos Personales

Una aplicación web para llevar el control de ingresos y gastos personales, desarrollada con **React**, **Node.js** y **MySQL**, aplicando principios **SOLID**, arquitectura limpia y un diseño moderno y responsivo.

---

## 📌 Características principales

- Registro e inicio de sesión de usuarios (JWT)
- Registro de movimientos financieros (ingresos/gastos)
- Clasificación por categorías
- Dashboard con resumen mensual
- Interfaz moderna y clara (React + TailwindCSS)
- Backend estructurado con buenas prácticas (Express)

---

## 📁 Estructura del Proyecto

control-gastos-personales/
├── backend/
│ ├── controllers/
│ ├── services/
│ ├── repositories/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── config/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── hooks/
│ │ └── App.jsx
│ └── public/
│
├── docs/
│ ├── modelo-bd.png
│ └── estructura-proyecto.png
│
├── .gitignore
└── README.md

---

## 🧠 Modelo de Base de Datos

- **usuarios**:
  - `id` (PK)
  - `nombre`
  - `email`
  - `password` (hash con bcrypt)

- **categorias**:
  - `id` (PK)
  - `nombre`
  - `tipo` (`ingreso` | `gasto`)

- **movimientos**:
  - `id` (PK)
  - `id_usuario` (FK → usuarios)
  - `id_categoria` (FK → categorias)
  - `monto`
  - `descripcion`
  - `fecha`

🖼️ Diagrama:  
![image](https://github.com/user-attachments/assets/96f33b21-4c95-4397-b177-245bd07e19dc)


---

## 🧱 Arquitectura Aplicada

Este proyecto está basado en **arquitectura por capas**, usando separación de responsabilidades y principios **SOLID**:

- `controllers/` → controlan la entrada HTTP
- `services/` → contiene lógica de negocio
- `repositories/` → acceso a la base de datos
- `models/` → estructuras de datos (opcional: Sequelize)
- `routes/` → agrupación de endpoints
- `middlewares/` → JWT, errores, validaciones

🖼️ Estructura gráfica del sistema:  
![image](https://github.com/user-attachments/assets/4948d5d3-6ee1-4b8a-9072-43a03841a6a3)


---

## 🚀 Tecnologías utilizadas

| Capa         | Tecnología                       |
|--------------|----------------------------------|
| Frontend     | React, Vite, TailwindCSS         |
| Backend      | Node.js, Express, JWT, bcrypt    |
| Base de datos| MySQL                            |
| Auth         | JSON Web Tokens (JWT)            |
| Hosting      | Vercel (frontend) + Render (API) |
| Control de versiones | Git + GitHub             |

---

## 📦 Cómo ejecutar el proyecto localmente

### 1. Clona el repositorio

bash
git clone https://github.com/tuusuario/control-gastos-personales.git
cd control-gastos-personales

### 2  Configura el backend
bash
Copiar
Editar
cd backend
npm install
Crea un archivo .env en la carpeta backend/ con las siguientes variables:

env
Copiar
Editar
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=control_gastos
JWT_SECRET=clave_supersecreta
Luego ejecuta el backend con:

bash
Copiar
Editar
npm run dev
