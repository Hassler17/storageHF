import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: string = 'http://localhost:8080/api/clientes'
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + '/listar');
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url + '/crear', cliente)
  }

  obtenerCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.url + '/' + id)
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url + '/actualizar/' + cliente.id_cliente, cliente);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete<any>(this.url+'/eliminar/' + id)
  }
}
