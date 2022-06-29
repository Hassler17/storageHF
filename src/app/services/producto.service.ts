import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url: string = 'http://localhost:8080/api/productos'
  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + '/listar');
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url + '/crear', producto)
  }

  obtenerProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.url + '/' + id)
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.url + '/actualizar/' + producto.id_producto, producto);
  }

}
