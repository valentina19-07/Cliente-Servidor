import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from './services/productos.service';

/**
 * Componente Angular que gestiona la vista del Módulo de Productos.
 *
 * @description
 * Presenta el catálogo de productos consumido desde la API REST
 * del servidor Express (`/api/productos`). Permite visualizar
 * la lista de productos en una tabla interactiva con badges de
 * categoría y formulario para registrar nuevos productos.
 *
 * Se activa mediante la ruta lazy-loaded `/productos`.
 *
 * @example
 * ```html
 * <app-productos></app-productos>
 * ```
 */
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  /**
   * Arreglo con la lista de productos obtenidos desde la API.
   * Se llena al inicializar el componente y al refrescar manualmente.
   */
  productos: Producto[] = [];

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
   * Objeto con los datos del nuevo producto que el usuario está
   * ingresando a través del formulario reactivo.
   */
  nuevoProducto: Partial<Producto> = {
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: ''
  };

  /**
   * Crea una instancia del componente e inyecta ProductosService.
   * @param productosService - Servicio HTTP para operaciones CRUD de productos.
   */
  constructor(private productosService: ProductosService) {}

  /**
   * Hook del ciclo de vida Angular que se ejecuta al inicializar el componente.
   * Dispara la carga inicial de productos desde la API.
   */
  ngOnInit(): void {
    this.cargarProductos();
  }

  /**
   * Realiza una petición GET al endpoint `/api/productos` y actualiza
   * el arreglo de productos. Maneja estados de carga y error.
   */
  cargarProductos(): void {
    this.cargando = true;
    this.error = '';
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.cargando = false;
        this.error = 'No se pudo conectar con el servidor Express en http://localhost:3000/api/productos. Asegúrese de que el backend esté ejecutándose.';
      },
    });
  }

  /**
   * Envía el formulario para crear un nuevo producto mediante POST.
   * Si la petición falla, igual agrega el producto localmente a la lista.
   * Limpia el formulario al terminar.
   */
  crear(): void {
    if (!this.nuevoProducto.nombre) return;
    this.productosService.crearProducto(this.nuevoProducto).subscribe({
      next: (creado) => {
        this.productos.unshift(creado);
        this.nuevoProducto = { nombre: '', precio: '', categoria: '', descripcion: '' };
      },
      error: (err) => console.error('Error al crear producto', err)
    });
  }
}