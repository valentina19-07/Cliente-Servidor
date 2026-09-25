import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientesService, Cliente } from './clientes.service';

describe('ClientesService', () => {
  let service: ClientesService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/clientes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientesService],
    });
    service = TestBed.inject(ClientesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe listar clientes mediante GET', () => {
    const mockClientes: Cliente[] = [
      { id: 'c-1', nombre: 'Valentina González', email: 'valen@uceva.edu.co', ciudad: 'Tuluá' }
    ];

    service.obtenerClientes().subscribe((clientes) => {
      expect(clientes.length).toBe(1);
      expect(clientes).toEqual(mockClientes);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes);
  });

  it('debe registrar un cliente nuevo mediante POST', () => {
    const nuevo: Partial<Cliente> = { nombre: 'Juan Vargas', email: 'juan.vargas03@uceva.edu.co', ciudad: 'Tuluá' };
    const creado: Cliente = { id: 'c-99', nombre: 'Juan Vargas', email: 'juan.vargas03@uceva.edu.co', ciudad: 'Tuluá' };

    service.crearCliente(nuevo).subscribe((resp) => {
      expect(resp).toEqual(creado);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(creado);
  });
});
