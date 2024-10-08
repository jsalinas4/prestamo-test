import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service'; // Asegúrate de tener bien configurada esta ruta
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // FormBuilder no se usa pero lo mantengo en caso lo necesites
import { User } from '../../models/user.model'; // Asegúrate de que el modelo User esté bien definido

@Component({
  selector: 'app-nuevasolicitud',
  standalone: true,
  imports: [RouterLink], // Elimina AppComponent de imports, ya que no es necesario aquí
  templateUrl: './nuevasolicitud.component.html',
  styleUrls: ['./nuevasolicitud.component.css'] // Se corrige el nombre a "styleUrls"
})
export class NuevasolicitudComponent {

  // Inyección del servicio a través del constructor
  constructor(private userService: UserService) {}

  @ViewChild('nombre') nombreInput!: ElementRef;
  @ViewChild('apellidoMaterno') apellidoMaternoInput!: ElementRef;
  @ViewChild('apellidoPaterno') apellidoPaternoInput!: ElementRef;

  onSubmit() {
    // Obtiene los valores de los inputs a través de ElementRef
    const nombre = this.nombreInput.nativeElement.value;
    const apellidoMaterno = this.apellidoMaternoInput.nativeElement.value;
    const apellidoPaterno = this.apellidoPaternoInput.nativeElement.value;

    console.log('Nombres:', nombre);
    console.log('Apellidos Maternos:', apellidoMaterno);
    console.log('Apellidos Paternos:', apellidoPaterno);

    // Crea el objeto User con los valores
    const user: User = {
      clientId: 0, // You may need to adjust this value depending on how you handle it
      clientType: 'Natural', // You can adjust this based on the form or logic
      firstName: nombre,
      lastName: `${apellidoPaterno} ${apellidoMaterno}`,
      dniRuc: '',
      address: '',
      phone: '',
      email: ''
    };

    // Llama al método del servicio para enviar los datos
    this.userService.sendClientData(user)
      .subscribe(response => {
        console.log('Datos enviados con éxito:', response);
      }, error => {
        console.error('Error al enviar los datos:', error);
      });
  }
}
