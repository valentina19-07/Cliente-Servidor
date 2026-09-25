import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaz que representa la estructura de un Cliente
 * tal como lo devuelve la API REST del servidor Express.
 */
export interface Cliente {
  /** Identificador único del cliente (UUID generado por Faker.js) */
  id: string;
  /** Nombre completo del cliente */
  nombre: string;
  /** Dirección de correo electrónico del cliente */
  email: string;
  /** Ciudad de residencia del cliente */
  ciudad: string;
}

/**
 * Servicio Angular que gestiona la comunicación HTTP
 * con el endpoint `/api/clientes` del servidor Express.
 *
 * @description
 * Consume la API REST del backend (Persona A) para obtener el directorio
 * de clientes generados dinámicamente con Faker.js.
 * Permite listar, buscar por ID y registrar nuevos clientes.
 *
 * @example
 * ```typescript
 * constructor(private clientesService: ClientesService) {}
 *
 * ngOnInit() {
 *   this.clientesService.obtenerClientes().subscribe(data => {
 *     this.clientes = data;
 *   });
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ClientesService {
  /**
   * URL base de la API REST de clientes en el servidor Express.
   * Por defecto apunta a `http://localhost:3000/api/clientes`.
   */
  private apiUrl = 'http://localhost:3000/api/clientes';

  /**
   * Crea una instancia del servicio e inyecta HttpClient.
   * @param http - Cliente HTTP de Angular para realizar peticiones REST.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado completo de clientes desde el servidor.
   * El backend retorna datos generados dinámicamente con Faker.js.
   * @returns Observable con un arreglo de objetos `Cliente`.
   */
  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  /**
   * Obtiene un cliente específico por su identificador único.
   * @param id - UUID del cliente a consultar.
   * @returns Observable con el objeto `Cliente` encontrado.
   */
  obtenerClientePorId(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  /**
   * Registra un nuevo cliente enviando los datos al servidor mediante POST.
   * @param cliente - Objeto parcial con los datos del nuevo cliente (nombre, email, ciudad).
   * @returns Observable con el `Cliente` creado por el servidor.
   */
  crearCliente(cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
}