# Evidencias de Desarrollo e Integración — Cliente Angular
**Estudiante:** Juan Fernando Vargas  
**Correo:** juan.vargas03@uceva.edu.co  
**Proyecto:** UCEVA — Taller 4 Cliente-Servidor (Angular + Node.js)  
**Rol:** Persona B — Desarrollo Frontend (Módulos Angular, Jest, Compodoc)  

---

## 1. Arquitectura y Módulos Desarrollados
Se implementó la arquitectura modular con lazy loading (`loadChildren`) en Angular dentro de `cliente/`:
1. **Módulo Productos (`/productos`):**
   - **Servicio:** `ProductosService` consumiendo `http://localhost:3000/api/productos` (GET, GET/:id, POST).
   - **Componente:** `ProductosComponent` con visualización de estado de carga, alerta de conectividad, tabla de productos con badges por categoría y formulario reactivo para creación.
2. **Módulo Clientes (`/clientes`):**
   - **Servicio:** `ClientesService` consumiendo `http://localhost:3000/api/clientes`.
   - **Componente:** `ClientesComponent` con tabla de directorio, enlaces directos `mailto:` y registro de clientes.
3. **Módulo Pedidos (`/pedidos`):**
   - **Servicio:** `PedidosService` consumiendo `http://localhost:3000/api/pedidos`.
   - **Componente:** `PedidosComponent` con formato de fechas (`date:'medium'`), badge de unidades y formulario de órdenes.

---

## 2. Pruebas Unitarias con Jest
Se configuró **Jest** como runner de pruebas unitarias reemplazando Karma/Jasmine:
- `jest.config.js` y `setup-jest.ts` configurados con preset `jest-preset-angular`.
- **Pruebas implementadas:**
  - `productos.service.spec.ts`: Valida inyección del servicio, petición GET con `HttpTestingController`, GET por ID y llamada POST con payload mockeado.
  - `clientes.service.spec.ts`: Valida listado de clientes GET y creación POST.
  - `pedidos.service.spec.ts`: Valida listado de órdenes GET y registro de pedidos POST.
- Comando para ejecución:
  ```bash
  npm test
  ```

---

## 3. Documentación Técnica con Compodoc
- Integración del script `"compodoc": "compodoc -p tsconfig.json -s"` en `package.json`.
- Compodoc escanea todo el código TypeScript, decoradores de Angular (`@Component`, `@Injectable`, `@NgModule`), tipos e interfaces generando documentación interactiva servida en `http://localhost:8080`.

---

## 4. Evidencia de Flujo de Trabajo Colaborativo (Git)
- Rama de trabajo de Persona B: `feature/client-modulos`
- Rama de trabajo de Persona A: `feature/server-modulos` / `feat/backend-api`
- Commits atómicos organizados por fases: estructura, servicios HTTP, componentes, routing, configuración de jest, pruebas unitarias y documentación técnica.
