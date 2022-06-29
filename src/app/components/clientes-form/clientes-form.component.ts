import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  // Variables
  cliente: Cliente = new Cliente();
  disabledButton = true;
  tittleComponent: String = "Crear nuevo Cliente"

  constructor(
    private clientesServices: ClienteService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        let id: number = params['id'];
        if (id) {
          this.tittleComponent = "Actualizar Cliente " + id
          this.clientesServices.obtenerCliente(id)
            .subscribe(response => {
              this.cliente = response
            })
        }
      })
  }

  validateForm() {
    if (this.cliente.fecha_nacimiento && this.cliente.nombre && this.cliente.apellido) {
      this.disabledButton = false
    } else {
      this.disabledButton = true
    }
  }

  // Funciones para la creacion y actualizacion de cliente
  crearCliente() {
    this.clientesServices.crearCliente(this.cliente)
      .subscribe(response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente registrado con exito!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => this._router.navigateByUrl('clientes'))
      })
  }


  actualizarCliente() {
    this.clientesServices.actualizarCliente(this.cliente)
      .subscribe(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente actualizado con exito!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => this._router.navigateByUrl('clientes'))
      })
  }

}
