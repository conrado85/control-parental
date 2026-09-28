#  Registro de Avances - App Móvil (Tutor)

##  Resumen General
Se maquetó y configuró la estructura base para la aplicación móvil del tutor utilizando **React Native**, **Expo** y **TypeScript**. Se implementó un sistema de navegación por pestañas (*Bottom Tabs*) adaptado para dispositivos Android y se crearon las 4 pantallas principales del flujo.

---

##  Cambios e Implementaciones

### 1. Arquitectura y Navegación Base (`apps/mobile`)
* **Navegación Inferior:** Configuración de `@react-navigation/bottom-tabs` en `App.tsx` encapsulada en `SafeAreaProvider`.
* **Ajustes de UI / Layout:** Corrección de solapamiento con la barra de navegación nativa de Android mediante `useSafeAreaInsets` de `react-native-safe-area-context`.


---

###  2. Pantallas Desarrolladas (`src/screens/tutor/`)

* **`DashBoardScreen.tsx` (Inicio):**
  * Estado de conexión y batería del dispositivo monitoreado en tiempo real.
  * Switch interactivo para pausa/bloqueo remoto del celular.
  * Tarjetas de alertas recientes clasificadas por severidad (`HIGH` / `MEDIUM`).
  * Resumen de uso global diario.

* **`StatsScreen.tsx` (Uso y Tiempos):**
  * Vista de tiempo total en pantalla vs. límite diario permitido.
  * Desglose de tiempo de uso individual por aplicación (TikTok, Instagram, YouTube, Roblox, etc.).
  * Barras de progreso con feedback visual (alerta en rojo al superar límites).

* **`SecurityScreen.tsx` (Reglas de Contenido):**
  * Módulo para filtrado y detección de palabras clave/sensibles.
  * Formulario dinámico para agregar nuevas palabras al filtro.
  * Toggles de activación/desactivación y opción para eliminar reglas.

* **`DevicesScreen.tsx` (Dispositivos y Ajustes):**
  * Ficha de dispositivos vinculados y verificación de permisos activos del sistema.
  * Simulación de vinculación de nuevos dispositivos mediante PIN / QR.
  * Menú de accesos a configuración de notificaciones y clave de tutor.

---

