import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesFormComponent } from './components/clientes-form/clientes-form.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FacturasFormComponent } from './components/facturas-form/facturas-form.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ProductosFormComponent } from './components/productos-form/productos-form.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  { path: '', component: FacturasComponent},
  { path: 'formFactura', component: FacturasFormComponent},
  { path: 'formFactura/:id', component: FacturasFormComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'formProducto', component: ProductosFormComponent},
  { path: 'formProducto/:id', component: ProductosFormComponent},
  { path: 'clientes', component: ClientesComponent},
  { path: 'formCliente', component: ClientesFormComponent},
  { path: 'formCliente/:id', component: ClientesFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
