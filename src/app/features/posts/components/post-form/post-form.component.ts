import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;  // Definir el FormGroup para el formulario
  title: string = '';
  content: string = '';

  constructor(private fb: FormBuilder) {
    // Inicializa postForm en el constructor
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.postForm.valid) {
      console.log('Formulario enviado', this.postForm.value);
    }
  }
}
