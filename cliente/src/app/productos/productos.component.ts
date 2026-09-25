import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from './services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  cargando = true;
  error = '';

  nuevoProducto: Partial<Producto> = {
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: ''
  };

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

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
