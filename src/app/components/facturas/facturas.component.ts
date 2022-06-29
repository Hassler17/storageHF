import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { DetalleService } from 'src/app/services/detalle.service';
import { FacturaService } from 'src/app/services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: Factura[] = [];
  productosAgregados: any[] = [];
  pagoTotalFactura: number = 0;
  idFactura: number = 0;

  constructor(
    private facturaService: FacturaService,
    private detalleService: DetalleService,
  ) { }

  ngOnInit(): void {
    this.facturaService.getFacturas()
      .subscribe(response => this.facturas = response);
  }

  getDetalles(id: number) {
    if (id) {
      this.idFactura = id;
      this.detalleService.getDetallesByFacturas(id)
        .subscribe(response => {
          const productosOld = []
          for (let i = 0; i < response.length; i++) {
            const element = response[i];
            productosOld.push({
              nombre: element.producto.nombre,
              total: parseInt(element.precio),
              cantidad: element.cantidad,
              id_producto: element.producto.id_producto
            })
            this.pagoTotalFactura = this.pagoTotalFactura + parseInt(element.precio)
          }
          return this.productosAgregados = productosOld
        })
    }
  }

  setCountsFactura() {
    this.pagoTotalFactura = 0
    this.idFactura = 0
  }

  deleteFactura(id: number) {
    this.facturaService.eliminarFactura(id)
      .subscribe(() => {
        this.facturas = this.facturas.filter((item) => item.num_factura !== id)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Factura eliminada con exito!',
          showConfirmButton: false,
          timer: 1200
        })
      })
  }

}




