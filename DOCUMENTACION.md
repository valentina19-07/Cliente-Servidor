# Backend - Taller 4 Punto 2

## Arquitectura
Patrón MVC: routes → controllers → models.

## Módulos nuevos
| Módulo    | Endpoint base     | Descripción                          |
|-----------|-------------------|---------------------------------------|
| Productos | /api/productos    | CRUD de productos con datos faker.js |
| Clientes  | /api/clientes     | CRUD de clientes con datos faker.js  |
| Pedidos   | /api/pedidos      | CRUD de pedidos con datos faker.js   |

## Cómo correr el servidor
```bash
npm install
npm start
```

## Documentación interactiva
http://localhost:3000/api-docs
(Reemplazar `3000` por el `PUERTO` configurado en caso de usar variable de entorno)
