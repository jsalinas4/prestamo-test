import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaprestamosComponent } from './components/listaprestamos/listaprestamos.component';
import { NuevasolicitudComponent } from './components/nuevasolicitud/nuevasolicitud.component';
import { PagocuotaComponent } from './components/pagocuota/pagocuota.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },  // Agrega tus otros componentes aquí
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'lista-prestamos', component: ListaprestamosComponent },
{ path: 'nueva-solicitud', component: NuevasolicitudComponent },
{ path: 'pago-cuota', component: PagocuotaComponent },
{ path: 'login', component: LoginComponent }

];
