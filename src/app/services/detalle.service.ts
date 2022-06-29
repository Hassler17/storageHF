import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detalle } from '../models/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  url: string = 'http://localhost:8080/api/detalles'
  constructor(private http: HttpClient) { }

  getDetalles(): Observable<Detalle[]>{
    return this.http.get<Detalle[]>(this.url+'/listar');
  }

  getDetallesByFacturas(id: number):  Observable<Detalle[]>{
    return this.http.get<Detalle[]>(this.url+'/listarporparametros'+'/' +id);
  }

  crearDetalle(detalle: Detalle): Observable<Detalle> {
    return this.http.post<Detalle>(this.url+'/crear', detalle)
  }

  actualizarDetalle(detalle: Detalle, ): Observable<Detalle> {
    return this.http.put<Detalle>(this.url+'/actualizar/'+detalle.num_detalle, detalle);
  }
}
