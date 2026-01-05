import { Component, signal } from '@angular/core';
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { Inicio } from "./components/inicio/inicio";
import { Stack } from "./components/stack/stack";
import { Experiencia } from "./components/experiencia/experiencia";
import { Proyecto } from "./components/proyecto/proyecto";
import { Contacto } from "./components/contacto/contacto";


@Component({
  selector: 'app-root',
  imports: [Footer, Header, Inicio, Stack, Experiencia, Proyecto, Contacto],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Jose Saire | Portfolio');
}
