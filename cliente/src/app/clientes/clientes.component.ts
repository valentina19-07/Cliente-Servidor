import { Component, OnInit } from '@angular/core';
import { ClientesService, Cliente } from './services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cargando = true;
  error = '';

  nuevoCliente: Partial<Cliente> = {
    nombre: '',
    email: '',
    ciudad: ''
  };

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

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
