import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductosService, Producto } from './productos.service';

describe('ProductosService', () => {
  let service: ProductosService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/productos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductosService],
    });
    service = TestBed.inject(ProductosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener productos del backend mediante GET', () => {
    const mockProductos: Producto[] = [
      { id: '1', nombre: 'Balón', precio: '50', categoria: 'Deportes', descripcion: 'Balón oficial' }
    ];

    service.obtenerProductos().subscribe((productos) => {
      expect(productos.length).toBe(1);
      expect(productos).toEqual(mockProductos);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);
  });

  it('debe obtener un producto por ID mediante GET /:id', () => {
    const mockProd: Producto = { id: 'p-123', nombre: 'Zapatillas', precio: '90', categoria: 'Calzado', descripcion: 'Pro' };

    service.obtenerProductoPorId('p-123').subscribe((prod) => {
      expect(prod).toEqual(mockProd);
    });

    const req = httpMock.expectOne(`${apiUrl}/p-123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProd);
  });

  it('debe enviar un producto nuevo mediante POST', () => {
    const nuevo: Partial<Producto> = { nombre: 'Gorra', precio: '20', categoria: 'Ropa' };
    const creado: Producto = { id: '10', nombre: 'Gorra', precio: '20', categoria: 'Ropa', descripcion: '' };

    service.crearProducto(nuevo).subscribe((resp) => {
      expect(resp).toEqual(creado);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevo);
    req.flush(creado);
  });
});
