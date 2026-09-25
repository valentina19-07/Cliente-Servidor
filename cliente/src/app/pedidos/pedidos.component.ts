import { Component, OnInit } from '@angular/core';
import { PedidosService, Pedido } from './services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  cargando = true;
  error = '';

  nuevoPedido: Partial<Pedido> = {
    producto: '',
    cantidad: 1
  };

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

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
