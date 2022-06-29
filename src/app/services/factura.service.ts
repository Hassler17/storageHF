import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  url: string = 'http://localhost:8080/api/facturas'
  constructor(private http: HttpClient) { }

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.url + '/listar');
  }

  crearFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.url + '/crear', factura)
  }

  obtenerFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(this.url + '/' + id)
  }

  actualizarFactura(factura: Factura): Observable<Factura> {
    return this.http.put<Factura>(this.url + '/actualizar/' + factura.num_factura, factura);
  }

  eliminarFactura(id: number): Observable<any> {
    return this.http.delete<any>(this.url+'/eliminar/' + id)
  }
}
