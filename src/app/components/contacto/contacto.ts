import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {

  private fb = inject(FormBuilder);

  onEmailSent = output<boolean>();

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitting = false;

  async enviar() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const serviceID = 'service_234jvat';
    const templateID = 'template_6emxoyf';
    const publicKey = '13LekuHBNqhvM9IPB';


    const templateParams = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      alert('¡Mensaje enviado con éxito!');
      this.contactForm.reset();

      this.onEmailSent.emit(true);

    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Ocurrió un error. Inténtalo de nuevo.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
