import { Component } from '@angular/core';
import { Actor } from './actor';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})

export class ActorComponent {
  // Lista de habilidades
  skills = ['Method Acting', 'Singing', 'Dancing', 'Swordfighting'];
  
  // Inicializa un actor con la habilidad seleccionada
  model = new Actor(18, 'Tom Cruise', this.skills[3], 'CW Productions');
  
  submitted = false;

  // Función que se ejecuta al enviar el formulario
  onSubmit() {
    this.submitted = true;
  }
}
