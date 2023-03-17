import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { ModalController } from '@ionic/angular'
import { RestService } from '../services/rest.service'

@Component({
  selector: 'app-login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['login-modal.component.scss'],
})
export class LoginModalComponent {
  name: string
  email: string
  password: string
  repeatedPassword: string
  isLoginModal = true

  constructor(private modalCtrl: ModalController,
    private restService: RestService,) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm')
  }

  onSubmit(form: NgForm) {
    console.log('submitting');
    if (!form.valid) {
      return
    }
    console.log('valid');
    const email = form.value.name
    const password = form.value.password
    if (!this.isLoginModal) {
      const name = form.value.name
      const repeatedPassword = form.value.repeatedPassword
      this.restService.register({ email, password, name, repeatedPassword })
    }
  }

  changeToSignup() {
    this.isLoginModal = false
  }

  changeToLogin() {
    this.isLoginModal = true
  }
}
