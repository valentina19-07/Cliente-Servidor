import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaz que representa la estructura de un Pedido
 * tal como lo devuelve la API REST del servidor Express.
 */
export interface Pedido {
  /** Identificador único del pedido (UUID generado por Faker.js) */
  id: string;
  /** Nombre del producto solicitado en el pedido */
  producto: string;
  /** Cantidad de unidades solicitadas (entre 1 y 5) */
  cantidad: number;
  /** Fecha de creación del pedido (ISO 8601 o Date) */
  fecha: string;
}

/**
 * Servicio Angular que gestiona la comunicación HTTP
 * con el endpoint `/api/pedidos` del servidor Express.
 *
 * @description
 * Consume la API REST del backend (Persona A) para obtener el listado
 * de órdenes y pedidos generados dinámicamente con Faker.js.
 * Permite listar, buscar por ID y registrar nuevos pedidos.
 *
 * @example
 * ```typescript
 * constructor(private pedidosService: PedidosService) {}
 *
 * ngOnInit() {
 *   this.pedidosService.obtenerPedidos().subscribe(data => {
 *     this.pedidos = data;
 *   });
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class PedidosService {
  /**
   * URL base de la API REST de pedidos en el servidor Express.
   * Por defecto apunta a `http://localhost:3000/api/pedidos`.
   */
  private apiUrl = 'http://localhost:3000/api/pedidos';

  /**
   * Crea una instancia del servicio e inyecta HttpClient.
   * @param http - Cliente HTTP de Angular para realizar peticiones REST.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado completo de pedidos desde el servidor.
   * El backend retorna datos generados dinámicamente con Faker.js.
   * @returns Observable con un arreglo de objetos `Pedido`.
   */
  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  /**
   * Obtiene un pedido específico por su identificador único.
   * @param id - UUID del pedido a consultar.
   * @returns Observable con el objeto `Pedido` encontrado.
   */
  obtenerPedidoPorId(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo pedido enviando los datos al servidor mediante POST.
   * @param pedido - Objeto parcial con los datos del nuevo pedido (producto, cantidad).
   * @returns Observable con el `Pedido` creado por el servidor.
   */
  crearPedido(pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }
}