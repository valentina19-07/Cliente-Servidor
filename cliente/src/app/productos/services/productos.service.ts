import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: string;
  nombre: string;
  precio: string;
  categoria: string;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: Partial<Producto>): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
}
