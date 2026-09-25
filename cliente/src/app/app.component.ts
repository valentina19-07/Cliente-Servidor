import { Component } from '@angular/core';

/**
 * Componente raíz de la aplicación Angular Cliente-Servidor.
 *
 * @description
 * Este es el componente principal (shell) de la aplicación.
 * Renderiza la barra de navegación global con los enlaces a los
 * tres módulos principales (Productos, Clientes, Pedidos) y
 * el `<router-outlet>` donde se cargan los módulos lazy-loaded.
 *
 * La aplicación consume la API REST del servidor Express (Persona A)
 * en `http://localhost:3000` con los endpoints:
 * - `GET/POST /api/productos`
 * - `GET/POST /api/clientes`
 * - `GET/POST /api/pedidos`
 *
 * @example
 * ```html
 * <!-- En index.html -->
 * <app-root></app-root>
 * ```
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Título de la aplicación Angular Cliente.
   * Usado como referencia interna del componente raíz.
   */
  title = 'Cliente Angular — Taller 4 Cliente-Servidor';
}