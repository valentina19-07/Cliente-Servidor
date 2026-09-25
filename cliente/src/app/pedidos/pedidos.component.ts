import { Component, OnInit } from '@angular/core';
import { PedidosService, Pedido } from './services/pedidos.service';

/**
 * Componente Angular que gestiona la vista del Módulo de Pedidos.
 *
 * @description
 * Presenta el listado de órdenes y pedidos consumidos desde la API REST
 * del servidor Express (`/api/pedidos`). Muestra las órdenes con
 * cantidades formateadas con badges, fechas en formato legible
 * y formulario para registrar nuevos pedidos.
 *
 * Se activa mediante la ruta lazy-loaded `/pedidos`.
 *
 * @example
 * ```html
 * <app-pedidos></app-pedidos>
 * ```
 */
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  /**
   * Arreglo con la lista de pedidos/órdenes obtenidos desde la API.
   * Se llena al inicializar el componente y al refrescar manualmente.
   */
  pedidos: Pedido[] = [];

  /**
   * Indicador de estado de carga. Es `true` mientras se espera
   * la respuesta del servidor y `false` una vez que llega.
   */
  cargando = true;

  /**
   * Mensaje de error mostrado al usuario cuando la petición HTTP falla.
   * Vacío cuando no hay errores activos.
   */
  error = '';

  /**
   * Objeto con los datos del nuevo pedido que el usuario está
   * ingresando a través del formulario de registro.
   */
  nuevoPedido: Partial<Pedido> = {
    producto: '',
    cantidad: 1
  };

  /**
   * Crea una instancia del componente e inyecta PedidosService.
   * @param pedidosService - Servicio HTTP para operaciones CRUD de pedidos.
   */
  constructor(private pedidosService: PedidosService) {}

  /**
   * Hook del ciclo de vida Angular que se ejecuta al inicializar el componente.
   * Dispara la carga inicial del listado de pedidos desde la API.
   */
  ngOnInit(): void {
    this.cargarPedidos();
  }

  /**
   * Realiza una petición GET al endpoint `/api/pedidos` y actualiza
   * el arreglo de pedidos. Maneja estados de carga y error.
   */
  cargarPedidos(): void {
    this.cargando = true;
    this.error = '';
    this.pedidosService.obtenerPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar pedidos', err);
        this.cargando = false;
        this.error = 'No se pudo conectar con el servidor Express en http://localhost:3000/api/pedidos.';
      }
    });
  }

  /**
   * Envía el formulario para registrar un nuevo pedido mediante POST.
   * Requiere el campo `producto` como campo obligatorio.
   * Limpia el formulario al terminar exitosamente.
   */
  crear(): void {
    if (!this.nuevoPedido.producto) return;
    this.pedidosService.crearPedido(this.nuevoPedido).subscribe({
      next: (creado) => {
        this.pedidos.unshift(creado);
        this.nuevoPedido = { producto: '', cantidad: 1 };
      },
      error: (err) => console.error('Error al crear pedido', err)
    });
  }
}