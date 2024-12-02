import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService} from '../../services/user.service';
import { NgFor } from '@angular/common';
import { LoginService } from '../../services/login/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listaprestamos',
  standalone: true,
  imports: [RouterLink, NgFor, FormsModule],
  templateUrl: './listaprestamos.component.html',
  styleUrl: './listaprestamos.component.css'
})
export class ListaprestamosComponent implements OnInit{
  prestamos: any[] = []; // Aquí guardaremos los préstamos
  filteredPrestamos: any[] = []; // Aquí guardamos los préstamos filtrados
  searchQuery: string = ''; // Variable para el texto de búsqueda

  ngOnInit(): void {
    // Recuperamos los préstamos desde el localStorage
    const storedLoans = localStorage.getItem('loansData');
    if (storedLoans) {
      this.prestamos = JSON.parse(storedLoans); // Parseamos los datos y los asignamos a prestamos
      this.filteredPrestamos = this.prestamos; // Inicializamos la lista de préstamos filtrados
    }
  }

  // Método para formatear la fecha
  formatFecha(dateString: string): string {
    const date = new Date(dateString);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear().toString().slice(-2);
    return `${dia}/${mes}/${anio}`;
  }

  // Método para filtrar los préstamos según el DNI
  searchClient(): void {
    const query = this.searchQuery.toLowerCase(); // Convertimos el texto de búsqueda a minúsculas
    if (query) {
      this.filteredPrestamos = this.prestamos.filter(prestamo => {
        // Comprobamos si el DNI o RUC contiene el texto de búsqueda
        return (prestamo.clientType === 'Natural' && prestamo.dniRuc.toLowerCase().includes(query)) ||
               (prestamo.clientType !== 'Natural' && prestamo.ruc.toLowerCase().includes(query));
      });
    } else {
      this.filteredPrestamos = this.prestamos; // Si no hay búsqueda, mostramos todos los préstamos
    }
  }
  

}
