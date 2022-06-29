import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { FacturasFormComponent } from './components/facturas-form/facturas-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosFormComponent } from './components/productos-form/productos-form.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientesFormComponent } from './components/clientes-form/clientes-form.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FacturasComponent,
    FacturasFormComponent,
    ProductosComponent,
    ProductosFormComponent,
    ClientesComponent,
    ClientesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
