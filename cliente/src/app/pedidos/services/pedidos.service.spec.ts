import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PedidosService, Pedido } from './pedidos.service';

describe('PedidosService', () => {
  let service: PedidosService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/pedidos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PedidosService],
    });
    service = TestBed.inject(PedidosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe listar pedidos mediante GET', () => {
    const mockPedidos: Pedido[] = [
      { id: 'p-1', producto: 'Balón', cantidad: 2, fecha: '2026-09-25' }
    ];

    service.obtenerPedidos().subscribe((pedidos) => {
      expect(pedidos.length).toBe(1);
      expect(pedidos).toEqual(mockPedidos);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPedidos);
  });

  it('debe crear un pedido nuevo mediante POST', () => {
    const nuevo: Partial<Pedido> = { producto: 'Camiseta', cantidad: 3 };
    const creado: Pedido = { id: 'p-50', producto: 'Camiseta', cantidad: 3, fecha: '2026-09-25' };

    service.crearPedido(nuevo).subscribe((resp) => {
      expect(resp).toEqual(creado);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(creado);
  });
});
