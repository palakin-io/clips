import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { bufferToggle } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email : '',
    password : ''
  }

  showAlert = false
  alertMsg = 'loging in'
  alertColor = 'blue'
  inSubmission = false

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async logIn(){
    this.showAlert = true
    this.alertMsg = 'Logging in'
    this.alertColor = 'blue'
    this.inSubmission = true
    try{
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
    } catch(e){
      this.inSubmission = false
      this.alertMsg = 'Error'
      this.alertColor = 'red'

      console.log(e)
      return
    }

    this.alertColor = 'green'
    this.alertMsg = 'Logged In'
  }
}
