import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaz que representa la estructura de un Producto
 * proveniente de la API REST del servidor Express.
 */
export interface Producto {
  /** Identificador único del producto (UUID generado por Faker.js) */
  id: string;
  /** Nombre comercial del producto */
  nombre: string;
  /** Precio del producto en formato string (ej. "49.99") */
  precio: string;
  /** Categoría a la que pertenece el producto */
  categoria: string;
  /** Descripción detallada del producto */
  descripcion: string;
}

/**
 * Servicio Angular que gestiona la comunicación HTTP
 * con el endpoint `/api/productos` del servidor Express.
 *
 * @description
 * Consume la API REST generada con Faker.js en el backend (Persona A).
 * Proporciona métodos para listar, obtener por ID y crear productos.
 *
 * @example
 * ```typescript
 * constructor(private productosService: ProductosService) {}
 *
 * ngOnInit() {
 *   this.productosService.obtenerProductos().subscribe(data => {
 *     this.productos = data;
 *   });
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ProductosService {
  /**
   * URL base de la API REST de productos en el servidor Express.
   * Por defecto apunta a `http://localhost:3000/api/productos`.
   */
  private apiUrl = 'http://localhost:3000/api/productos';

  /**
   * Crea una instancia del servicio e inyecta HttpClient.
   * @param http - Cliente HTTP de Angular para realizar peticiones REST.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de productos desde el servidor.
   * El backend genera los datos dinámicamente con Faker.js.
   * @returns Observable con un arreglo de objetos `Producto`.
   */
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  /**
   * Obtiene un producto específico por su identificador único.
   * @param id - UUID del producto a consultar.
   * @returns Observable con el objeto `Producto` encontrado.
   */
  obtenerProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo producto enviando los datos al servidor mediante POST.
   * @param producto - Objeto parcial con los datos del nuevo producto.
   * @returns Observable con el `Producto` creado por el servidor.
   */
  crearProducto(producto: Partial<Producto>): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
}