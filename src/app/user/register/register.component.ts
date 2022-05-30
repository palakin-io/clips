import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { bufferToggle } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService){}

  inSubmission:boolean = false;

  name= new FormControl('', [Validators.required, Validators.minLength(4)])
  email= new FormControl('', [Validators.required, Validators.email])
  age= new FormControl('', [Validators.required, Validators.min(18), Validators.max(95)])
  password= new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm), Validators.maxLength(45)])
  confirmPassword= new FormControl('' , [Validators.required])
  phoneNumber= new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)])

  showAlert = false
  alertMsg = 'Please whait!'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    age: this.age,
    password: this.password,
    email: this.email,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  })

  async register(){
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = this.alertMsg + " account is being created";
    this.alertColor = this.alertColor;


    try{
      this.auth.createUser(this.registerForm.value)
    } catch(e){
      console.error(e)

      this.alertMsg = 'An unexpected error ocurred! Plz try again later'
      this.alertColor = 'red'
      this.inSubmission = false;
      return
    }

    this.alertMsg = 'Success! Your account has been created.'
    this.alertColor = 'green'
  }

}
