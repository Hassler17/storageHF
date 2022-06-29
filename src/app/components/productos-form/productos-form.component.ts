import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {
  // Variables
  producto: Producto = new Producto();
  disabledButton = true;
  tittleComponent: String = "Crear nuevo Producto"
  constructor(
    private productosServices: ProductoService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        let id: number = params['id'];
        if (id) {
          this.tittleComponent = "Actualizar Cliente " + id
          this.productosServices.obtenerProducto(id)
            .subscribe(response => {
              this.producto = response
            })
        }
      })
  }

  validateForm() {
    if (this.producto.nombre && this.producto.stock && this.producto.precio) {
      this.disabledButton = false
    } else {
      this.disabledButton = true
    }
  }

  // Funciones para la creacion y actualizacion de producto
  crearProducto() {
    this.productosServices.crearProducto(this.producto)
      .subscribe(response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto registrado con exito!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => this._router.navigateByUrl('productos'))
      })
  }


  actualizarProducto() {
    this.productosServices.actualizarProducto(this.producto)
      .subscribe(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto actualizado con exito!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => this._router.navigateByUrl('productos'))
      })
  }

}
