import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ActorComponent } from './actor/actor.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaprestamosComponent } from './components/listaprestamos/listaprestamos.component';
import { NuevasolicitudComponent } from './components/nuevasolicitud/nuevasolicitud.component';
import { PagocuotaComponent } from './components/pagocuota/pagocuota.component';
import { LoginComponent } from './auth/login/login.component';
import { UserService } from './services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, ActorComponent, InicioComponent, ListaprestamosComponent, NuevasolicitudComponent, PagocuotaComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testag';

  

}
