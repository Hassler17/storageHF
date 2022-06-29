import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Detalle } from 'src/app/models/detalle';
import { Factura } from 'src/app/models/factura';
import { Producto } from 'src/app/models/producto';
import { ClienteService } from 'src/app/services/cliente.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facturas-form',
  templateUrl: './facturas-form.component.html',
  styleUrls: ['./facturas-form.component.css']
})
export class FacturasFormComponent implements OnInit {
  // Variables
  factura: Factura = new Factura();
  detalle: Detalle = new Detalle();
  totalGeneral = 0;
  disabledButton = true;
  activeButton = false;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  productosAgregados: any[] = [];
  tittleComponent: String = " Crear nueva Factura"


  constructor(
    private facturasForServices: FacturaService,
    private clientesServices: ClienteService,
    private productoService: ProductoService,
    private detalleService: DetalleService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientesServices.getClientes()
      .subscribe(response => this.clientes = response)

    this.productoService.getProductos()
      .subscribe(response => this.productos = response)

    this.activatedRoute.params
      .subscribe(params => {
        let id: number = params['id'];
        if (id) {
          this.tittleComponent = "Actualizar factura " + id
          this.facturasForServices.obtenerFactura(id)
            .subscribe(response => this.factura = response)

          this.detalleService.getDetallesByFacturas(id)
            .subscribe(response => {
              const productosOld = []
              for (let i = 0; i < response.length; i++) {
                const element = response[i];
                productosOld.push({
                  nombre: element.producto.nombre,
                  total: parseInt(element.precio),
                  cantidad: element.cantidad,
                  id_producto: element.producto.id_producto,
                  num_detalle: element.num_detalle
                })
                this.totalGeneral = this.totalGeneral + parseInt(element.precio)
              }
              return this.productosAgregados = productosOld
            })
        }
      })

  }

  validateForm() {
    if (this.factura.fecha && this.factura.cliente && this.productosAgregados.length > 0) {
      this.disabledButton = false
    } else {
      this.disabledButton = true
    }
  }

  // Funciones para agregar al carrito items
  agregarItem(id: any, nombre: any, valor: any) {

    if (this.productosAgregados.some((item) => item.id_producto == id)) {
      const productoListado = this.productosAgregados[this.productosAgregados.findIndex((item) => item.id_producto == id)]
      this.productosAgregados[this.productosAgregados.findIndex((item) => item.id_producto == id)].total = productoListado.total + valor
      this.productosAgregados[this.productosAgregados.findIndex((item) => item.id_producto == id)].cantidad = productoListado.cantidad + 1
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Producto ${nombre} agregado al carrito`,
        showConfirmButton: false,
        timer: 1500
      })
      this.productosAgregados.push({ id_producto: id, nombre: nombre, total: valor, cantidad: 1 })
    }

    this.totalGeneral = this.totalGeneral + valor
    this.validateForm()

  }


  removerItem(id: any, valor: any) {
    if (this.productosAgregados.some((item) => item.id_producto == id)) {
      const productoListado = this.productosAgregados[this.productosAgregados.findIndex((item) => item.id_producto == id)]
      this.productosAgregados[this.productosAgregados.findIndex((item) => item.id_producto == id)].total = productoListado.total - valor
      this.productosAgregados[this.productosAgregados.findIndex((item) => item.id_producto == id)].cantidad = productoListado.cantidad - 1
      if (this.productosAgregados[this.productosAgregados.findIndex((item) => item.id_producto == id)].cantidad == 0) {
        this.productosAgregados.splice(this.productosAgregados.findIndex((item) => item.id_producto == id), 1)
      }
      this.totalGeneral = this.totalGeneral - valor
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No has agregado este producto al carrito',
        showConfirmButton: false,
        timer: 1500
      })
    }
    this.validateForm()
  }

  // Fin de Funciones para agregar al carrito items

  CompararCliente(o1: Cliente, o2: Cliente): boolean {
    if (o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id_cliente === o2.id_cliente;
  }
  // Funciones para la creacion y actualizacion de facturas
  crearFactura() {
    this.facturasForServices.crearFactura(this.factura)
      .subscribe(response => {
        for (let i = 0; i < this.productosAgregados.length; i++) {
          const element = this.productosAgregados[i];
          this.detalleService.crearDetalle({
            num_detalle: null,
            precio: element.total,
            factura: response.num_factura,
            producto: element,
            cantidad: element.cantidad
          })
            .subscribe(() => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Factura registra con exito!',
                showConfirmButton: false,
                timer: 1500
              }).then(() => this._router.navigateByUrl(''))
            })
        }
      })
  }

  actualizarFactura() {
    this.facturasForServices.actualizarFactura(this.factura)
      .subscribe(response => {
        let registersSuccess = 0
        for (let i = 0; i < this.productosAgregados.length; i++) {
          const element = this.productosAgregados[i];
          if (element.num_detalle) {
            this.detalleService.actualizarDetalle({
              num_detalle: element.num_detalle,
              precio: element.total,
              factura: response.num_factura,
              producto: element,
              cantidad: element.cantidad
            })
              .subscribe(() => {
                registersSuccess = registersSuccess + 1
              })
          } else {
            this.detalleService.crearDetalle({
              num_detalle: element.num_detalle,
              precio: element.total,
              factura: response.num_factura,
              producto: element,
              cantidad: element.cantidad
            })
              .subscribe(() => {
                registersSuccess = registersSuccess + 1
              })
          }
          if (registersSuccess = this.productosAgregados.length) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Factura actualizada con exito!',
              showConfirmButton: false,
              timer: 1500
            }).then(() => this._router.navigateByUrl(''))
          }
        }
      })
  }





}
