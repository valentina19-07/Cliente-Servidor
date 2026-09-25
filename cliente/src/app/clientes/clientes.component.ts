import { Component, OnInit } from '@angular/core';
import { ClientesService, Cliente } from './services/clientes.service';

/**
 * Componente Angular que gestiona la vista del Módulo de Clientes.
 *
 * @description
 * Presenta el directorio de clientes consumido desde la API REST
 * del servidor Express (`/api/clientes`). Permite visualizar
 * el listado en una tabla con badges de ciudad, enlaces mailto
 * y formulario de registro de nuevos clientes.
 *
 * Se activa mediante la ruta lazy-loaded `/clientes`.
 *
 * @example
 * ```html
 * <app-clientes></app-clientes>
 * ```
 */
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  /**
   * Arreglo con la lista de clientes obtenidos desde la API.
   * Se llena al inicializar el componente y al refrescar manualmente.
   */
  clientes: Cliente[] = [];

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
   * Objeto con los datos del nuevo cliente que el usuario está
   * ingresando a través del formulario de registro.
   */
  nuevoCliente: Partial<Cliente> = {
    nombre: '',
    email: '',
    ciudad: ''
  };

  /**
   * Crea una instancia del componente e inyecta ClientesService.
   * @param clientesService - Servicio HTTP para operaciones CRUD de clientes.
   */
  constructor(private clientesService: ClientesService) {}

  /**
   * Hook del ciclo de vida Angular que se ejecuta al inicializar el componente.
   * Dispara la carga inicial del directorio de clientes desde la API.
   */
  ngOnInit(): void {
    this.cargarClientes();
  }

  /**
   * Realiza una petición GET al endpoint `/api/clientes` y actualiza
   * el arreglo de clientes. Maneja estados de carga y error.
   */
  cargarClientes(): void {
    this.cargando = true;
    this.error = '';
    this.clientesService.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
        this.cargando = false;
        this.error = 'No se pudo conectar con el servidor Express en http://localhost:3000/api/clientes.';
      }
    });
  }

  /**
   * Envía el formulario para registrar un nuevo cliente mediante POST.
   * Requiere nombre y email como campos obligatorios.
   * Limpia el formulario al terminar exitosamente.
   */
  crear(): void {
    if (!this.nuevoCliente.nombre || !this.nuevoCliente.email) return;
    this.clientesService.crearCliente(this.nuevoCliente).subscribe({
      next: (creado) => {
        this.clientes.unshift(creado);
        this.nuevoCliente = { nombre: '', email: '', ciudad: '' };
      },
      error: (err) => console.error('Error al crear cliente', err)
    });
  }
}