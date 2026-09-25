# Control Parental

Aplicación de control parental para dispositivos Android.

El proyecto está organizado como un **monorepo** utilizando **npm Workspaces**, con una separación entre la aplicación móvil, el backend y los tipos compartidos.

## Tecnologías

* React Native
* TypeScript
* Node.js
* Express
* npm Workspaces
* Kotlin
* Android SDK
* Git

## Estructura del proyecto

```text
control-parental/
│
├── apps/
│   ├── mobile/          # Aplicación móvil
│   │
│   └── backend/         # API/backend
│
├── packages/
│   └── types/            # Tipos TypeScript compartidos
│
├── package.json
├── package-lock.json
└── README.md
```

## Requisitos

Antes de comenzar, tener instalado:

* Node.js
* npm
* Git
* Java JDK
* Android Studio
* Android SDK

Versiones utilizadas actualmente durante el desarrollo:

```text
Node.js 22.14.0
npm 10.9.2
Git 2.40.0
Java 21.0.6 LTS
```

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd control-parental
```

Instalar las dependencias:

```bash
npm install
```

Al utilizar npm Workspaces, las dependencias de los diferentes paquetes se administran desde el monorepo.

## Workspaces

El proyecto actualmente contiene los siguientes paquetes:

```text
@control-parental/mobile
@control-parental/backend
@control-parental/types
```

Para comprobar que los workspaces están correctamente instalados:

```bash
npm ls --workspaces
```

## Backend

El backend se encuentra en:

```text
apps/backend
```

### Iniciar el backend en modo desarrollo

Desde la raíz del proyecto:

```bash
npm run dev -w @control-parental/backend
```

También se puede ejecutar directamente desde el workspace:

```bash
cd apps/backend
npm run dev
```

El backend utiliza `tsx watch`, por lo que los cambios realizados en el código se detectan automáticamente durante el desarrollo.

### Endpoints actuales

Actualmente se encuentra funcionando el recurso:

```text
/devices
```

La API seguirá creciendo a medida que se implementen las funcionalidades del proyecto.

## Mobile

La aplicación móvil se encuentra en:

```text
apps/mobile
```

Para ejecutar los comandos específicos del workspace:

```bash
npm run <comando> -w @control-parental/mobile
```

Los comandos disponibles dependerán de la configuración de React Native/Android.

## Types

Los tipos compartidos se encuentran en:

```text
packages/types
```

Este paquete permite compartir interfaces y tipos TypeScript entre diferentes aplicaciones del monorepo.

Por ejemplo:

```text
apps/backend
      │
      ├──── @control-parental/types
      │
apps/mobile
      │
      └──── @control-parental/types
```

De esta manera evitamos definir los mismos tipos varias veces.

## Comandos principales

Desde la raíz del proyecto:

### Instalar dependencias

```bash
npm install
```

### Ejecutar backend

```bash
npm run dev -w @control-parental/backend
```

### Ver los workspaces

```bash
npm ls --workspaces
```

### Ejecutar un comando en un workspace

```bash
npm run <comando> -w <workspace>
```

Ejemplo:

```bash
npm run dev -w @control-parental/backend
```

## Flujo de desarrollo

La idea del proyecto es trabajar de forma incremental:

```text
Frontend / Mobile
       │
       │
       ▼
Shared Types
       │
       │
       ▼
Backend API
       │
       ▼
Base de datos
       │
       ▼
Servicios Android / Kotlin
```

La aplicación móvil utilizará React Native para la interfaz y lógica compartida, mientras que las funcionalidades específicas de Android podrán implementarse mediante Kotlin y las APIs nativas correspondientes.

## Estado actual

### Monorepo

* [x] Inicialización del repositorio
* [x] Git configurado
* [x] npm Workspaces configurado
* [x] `apps/mobile`
* [x] `apps/backend`
* [x] `packages/types`

### Types

* [x] TypeScript configurado
* [x] Paquete compartido `@control-parental/types`
* [x] Tipos iniciales creados

### Backend

* [x] Backend inicial configurado
* [x] TypeScript configurado
* [x] Servidor de desarrollo
* [x] Rutas iniciales
* [x] Controladores iniciales
* [x] Endpoint `devices` funcionando

### Mobile

* [ ] Configuración inicial
* [ ] Navegación
* [ ] Pantallas principales
* [ ] Comunicación con backend
* [ ] Vinculación de dispositivos

### Android / Kotlin

* [ ] Configuración de proyecto Android
* [ ] Integración con React Native
* [ ] `DevicePolicyManager`
* [ ] Gestión de restricciones
* [ ] Funcionalidades específicas de control parental

## Git

Los cambios deben realizarse mediante commits pequeños y descriptivos.

Ejemplo:

```bash
git status
```

Agregar cambios:

```bash
git add .
```

Crear commit:

```bash
git commit -m "feat: add devices controller"
```

Ver historial:

```bash
git log --oneline
```

## Objetivo del proyecto

El objetivo es desarrollar una aplicación de control parental que permita administrar dispositivos Android vinculados a un perfil responsable.

Entre las funcionalidades previstas se encuentran:

* Vinculación de dispositivos.
* Administración de dispositivos protegidos.
* Activación y desactivación de la protección.
* Configuración de sitios bloqueados.
* Registro de intentos de acceso bloqueados.
* Estado de protección.
* Actividad reciente.
* Alertas.
* Restricciones relacionadas con la instalación de aplicaciones.
* Comunicación entre la aplicación responsable y los dispositivos protegidos.

> **Nota:** algunas funcionalidades de control parental dependen de las APIs y permisos disponibles en Android y deberán evaluarse durante el desarrollo.
