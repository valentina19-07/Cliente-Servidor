import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id: string;
  producto: string;
  cantidad: number;
  fecha: string;
}

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  obtenerPedidoPorId(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  crearPedido(pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }
}
