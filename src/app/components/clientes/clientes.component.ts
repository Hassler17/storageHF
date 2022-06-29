import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
    .subscribe(response =>  this.clientes = response);
  }

  deleteCliente(id: number) {
    this.clienteService.eliminarCliente(id)
      .subscribe(() => {
        this.clientes = this.clientes.filter((item) => item.id_cliente !== id)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente eliminado con exito!',
          showConfirmButton: false,
          timer: 1200
        })
      })
  }

}
