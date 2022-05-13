import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name= new FormControl('', [Validators.required, Validators.minLength(4)])
  email= new FormControl('', [Validators.required, Validators.email])
  age= new FormControl('', [Validators.required, Validators.min(18), Validators.max(95)])
  password= new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm), Validators.maxLength(45)])
  confirmPassword= new FormControl('' , [Validators.required])
  phoneNumber= new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)])

  registerForm = new FormGroup({
    name: this.name,
    age: this.age,
    password: this.password,
    email: this.email,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  })

  register(){
    console.log('register done')
  }

}
