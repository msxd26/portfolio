import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.prod';

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

    const { serviceId, templateId, publicKey } = environment.emailJs;

    const templateParams = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      Swal.fire({
        title: '¡Mensaje Enviado!',
        text: 'Gracias por contactarme, te responderé lo antes posible.',
        icon: 'success',
        confirmButtonText: 'Genial',
        confirmButtonColor: '#2563eb',
        heightAuto: false
      });

      this.contactForm.reset();
      this.onEmailSent.emit(true);

    } catch (error) {
      console.error('Error al enviar:', error);
      Swal.fire({
        title: 'Hubo un error',
        text: 'No se pudo enviar el mensaje. Por favor intenta de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d33'
      });
    } finally {
      this.isSubmitting = false;
    }
  }
}
