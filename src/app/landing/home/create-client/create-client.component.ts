import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.scss'
})
export class CreateClientComponent {
  createDocForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) {

  }


  ngOnInit() {
    this.createUser()
  }




  createUser() {
    this.createDocForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        emailAddress: ['', Validators.required],
        password: ['', Validators.required],
        phoneNumber: [''],
        phoneId: ['', Validators.required],
        language: ['', Validators.required],
        firstName: [, Validators.required],
        lastName: [''],
        customerType: ['', Validators.required],
        longitude: ['', Validators.required],
        latitude: [, Validators.required],
        ipAddress: [, Validators.required],
      }
    )
  }


  submitDoc() {

  }
}
