import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup; // Formulario reactivo

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario
    this.postForm = this.fb.group({
      image: [null, Validators.required], // Campo de imagen
      content: ['', [Validators.required, Validators.minLength(10)]] // Campo de texto
    });
  }

  ngOnInit(): void {}

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.postForm.valid) {
      console.log('Formulario enviado', this.postForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  // Método para manejar la selección de imagen
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.postForm.patchValue({ image: file });
      this.postForm.get('image')?.updateValueAndValidity();
      console.log('Imagen seleccionada:', file);
    }
  }
}
