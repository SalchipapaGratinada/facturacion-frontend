import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarFacturaComponent } from './features/facturas/components/buscar-factura/buscar-factura.component';
import { CrearFacturaComponent } from './features/facturas/components/crear-factura/crear-factura.component';
import { MenuFacturasComponent } from './features/facturas/components/menu-facturas/menu-facturas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'menu-facturas', pathMatch: 'full' },
  { path: 'menu-facturas', component: MenuFacturasComponent },
  { path: 'crear-factura', component: CrearFacturaComponent },
  { path: 'buscar-factura', component: BuscarFacturaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
