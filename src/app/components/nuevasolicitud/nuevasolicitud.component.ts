import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service'; // Asegúrate de tener bien configurada esta ruta
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms'; // FormBuilder no se usa pero lo mantengo en caso lo necesites
import { User } from '../../models/user.model'; // Asegúrate de que el modelo User esté bien definido
import { LoginService } from '../../services/login/login.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-nuevasolicitud',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgFor], // Elimina AppComponent de imports, ya que no es necesario aquí
  templateUrl: './nuevasolicitud.component.html',
  styleUrls: ['./nuevasolicitud.component.css'], // Se corrige el nombre a "styleUrls"
})
export class NuevasolicitudComponent implements OnInit{

  // Inyección del servicio a través del constructor
  constructor(private userService: UserService, private loginService:LoginService, private router: Router) {}
  ngOnInit(): void {
    if (!this.loginService.currentUserLoginOn.getValue()) {
      this.router.navigateByUrl('/login')
    } else {
      
    }
    this.changeForm = this.changeForm.bind(this);
  }

  @ViewChild('dni') dniInput!: ElementRef;
  @ViewChild('ruc') rucInput!: ElementRef;
  @ViewChild('direccion') direccionInput!: ElementRef;
  @ViewChild('monto') montoInput!: ElementRef;
  @ViewChild('fecha') fechaInput!: ElementRef;
  @ViewChild('nombre') nombreInput!: ElementRef;
  @ViewChild('proyecto') proyectoInput!: ElementRef;

  @ViewChild('razonSocial') razonSocialInput!: ElementRef; // Para Persona Jurídica
  @ViewChild('direccionJuridica') direccionJuridicaInput!: ElementRef; // Para Persona Jurídica
  @ViewChild('nombreEmprendedor') nombreEmprendedorInput!: ElementRef; // Para Emprendedor
  @ViewChild('apellidoEmprendedor') apellidoEmprendedorInput!: ElementRef; // Para Emprendedor

  monto: number = 0;
  fechaIngreso: string = '';
  cuotas: number = 0;
  cuotasjuridica: number = 0;
  cuotasemprendedor: number = 0;
  fechasPago: { fecha: string, cuota: string }[] = [];

    // Método para obtener los préstamos almacenados en localStorage
    getStoredLoans() {
      const loans = localStorage.getItem('loansData');
      return loans ? JSON.parse(loans) : [];
    }
  
  // Método para almacenar los datos de los préstamos en localStorage
  storeLoans(loans: any[]) {
    localStorage.setItem('loansData', JSON.stringify(loans));
  }

  onSubmit() {
    let loanData: any;
    const storedLoans = this.getStoredLoans();  // Obtener los préstamos existentes
    const fechaInicio = new Date(this.fechaInput.nativeElement.value);
    // Crear los préstamos dependiendo de la opción seleccionada
    if (this.selectedForm === 'natural') {
      for (let i = 0; i < this.cuotas; i++) {
        const newLoan = {
          clientId: storedLoans.length + 1 + i,  // ID único para cada préstamo
          clientType: 'Natural',
          dniRuc: this.dniInput.nativeElement.value,
          monto: this.montoInput.nativeElement.value,
          fechaIngreso: this.fechaInput.nativeElement.value,
          cuotas: 1 + i,
          loanDate: new Date(fechaInicio.setMonth(fechaInicio.getMonth() + i)).toISOString(),  // Aumentar el mes para cada préstamo
        };

        storedLoans.push(newLoan);  // Agregar el préstamo al arreglo de préstamos
      }
      this.storeLoans(storedLoans);  // Guardar los préstamos en localStorage
      console.log('Préstamos guardados:', storedLoans);

    } else if (this.selectedForm === 'juridica') {
      for (let i = 0; i < this.cuotas; i++) {
        const newLoan = {
          clientId: storedLoans.length + 1 + i,
          clientType: 'Juridica',
          razonSocial: this.razonSocialInput.nativeElement.value,
          ruc: this.rucInput.nativeElement.value,
          monto: this.montoInput.nativeElement.value,
          loanDate: new Date(fechaInicio.setMonth(fechaInicio.getMonth() + i)).toISOString(),
        };

        storedLoans.push(newLoan);
      }
      this.storeLoans(storedLoans);
      console.log('Préstamos Persona Jurídica guardados:', storedLoans);

    } else if (this.selectedForm === 'emprendedor') {
      for (let i = 0; i < this.cuotas; i++) {
        const newLoan = {
          clientId: storedLoans.length + 1 + i,
          clientType: 'Emprendedor',
          firstName: this.nombreEmprendedorInput.nativeElement.value,
          project: this.proyectoInput.nativeElement.value,
          monto: this.montoInput.nativeElement.value,
          loanDate: new Date(fechaInicio.setMonth(fechaInicio.getMonth() + i)).toISOString(),
        };

        storedLoans.push(newLoan);
      }
      this.storeLoans(storedLoans);
      console.log('Préstamos Emprendedor guardados:', storedLoans);
    }
  }

  onSearch() {
    // Imprime en la consola dependiendo del formulario seleccionado
    if (this.selectedForm === 'natural') {
      console.log("Formulario de Persona Natural activado.");

      this.userService.getClientByDni(this.dniInput.nativeElement.value)
      .subscribe(response => {
          console.log('Datos enviados con éxito:', response);

      this.nombreInput.nativeElement.value=`${response.nombres} ${response.apellidoPaterno} ${response.apellidoMaterno}`;
    }, error => {
      console.error('Error al enviar los datos:', error);
    });


    } else if (this.selectedForm === 'juridica') {
      console.log("Formulario de Persona Jurídica activado.");

      this.userService.getClientByRuc(this.rucInput.nativeElement.value)
      .subscribe(response => {
          console.log('Datos enviados con éxito:', response);

      this.razonSocialInput.nativeElement.value=response.razonSocial;
      this.direccionInput.nativeElement.value=response.direccion;
    }, error => {
      console.error('Error al enviar los datos:', error);
    });


    } else if (this.selectedForm === 'emprendedor') {
      console.log("Formulario de Emprendedor activado.");
    } else {
      console.log("Ningún formulario seleccionado.");
    }
  }


  selectedForm: string = 'natural'; // Por defecto seleccionamos Persona Natural

  changeForm() {
    // Aquí ya no es necesario ocultar o mostrar los formularios manualmente, Angular lo hace con *ngIf
    console.log("Formulario seleccionado: " + this.selectedForm);
  }

  registrarPrestamo() {
    // Lógica para registrar el préstamo
    console.log("Solicitud de préstamo registrada para: " + this.selectedForm);

    // Guardar los datos del formulario en local storage
    const formData = {
      selectedForm: this.selectedForm,
      nombre: this.nombreInput.nativeElement.value,
      monto: this.montoInput.nativeElement.value,
      fechaIngreso: this.fechaInput.nativeElement.value,
      cuotas: this.cuotas,
    };

    localStorage.setItem('prestamoData', JSON.stringify(formData));
    console.log('Datos del formulario guardados en local storage:', formData);
  }

  


  // Función para actualizar las fechas de pago
  actualizarFechasPagoPersonaNatural() {
    const monto: number = this.montoInput.nativeElement.value;
    const fechaIngreso: Date = this.fechaInput.nativeElement.value;
    var cuotas: number = this.cuotas;

    if (this.selectedForm === 'natural') {
      cuotas = this.cuotas;
    } else if(this.selectedForm === 'juridica'){
      cuotas = this.cuotasjuridica
    } else if(this.selectedForm === 'emprendedor'){
      cuotas = this.cuotasemprendedor
    }

    console.log(monto,fechaIngreso, cuotas)

    let resultado = (1000 + (1000 * 0.20 * 6)).toFixed(2);


    // Verificar que los campos estén completos
    if (monto > 0 && fechaIngreso && cuotas) {
      // Convertir la fecha de ingreso a un objeto Date
      const fecha = new Date(fechaIngreso);
      this.fechasPago = []; // Limpiar las fechas anteriores

      // Calcular el interés según la cantidad de cuotas
      let interes: number = 0;
      console.log(interes.toFixed(2));  // 2200.00
      if (cuotas === 1) {
        interes = 0.10; // 10% de interés para 1 cuota
      } else if (cuotas === 6) {
        interes = 0.20 * 6; // 20% de interés para 6 cuotas
        console.log()
      }

      // Calcular el monto total con el interés
      const montoTotal = monto + (monto * interes);
      console.log(montoTotal, interes, monto )
      const cuota = montoTotal / cuotas; // Monto de cada cuota
      console.log(cuota)

      // Calcular las fechas de pago basadas en el número de cuotas
      for (let i = 1; i <= cuotas; i++) {
        let nuevaFecha = new Date(fecha);
        nuevaFecha.setMonth(fecha.getMonth() + i); // Sumar meses por cada cuota

        // Verificar si el día de la fecha es mayor que el último día del mes
        if (nuevaFecha.getDate() !== fecha.getDate()) {
          nuevaFecha = new Date(nuevaFecha.getFullYear(), nuevaFecha.getMonth() + 1, 0); // Último día del mes
        }

        // Formatear la fecha al formato dd/mm/aa
        const fechaFormateada = this.formatFecha(nuevaFecha);

        // Añadir la fecha y monto al array de fechas de pago
        this.fechasPago.push({
          fecha: fechaFormateada,
          cuota: cuota.toFixed(2)
        });
      }
    }


    
  }

  // Función para formatear la fecha a formato dd/mm/aa
  formatFecha(date: Date): string {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear().toString().slice(-2);
    return `${dia}/${mes}/${anio}`;
  }

  
}
