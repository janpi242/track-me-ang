import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { ModalController } from '@ionic/angular'

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

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm')
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.name
    const password = form.value.password
    if (!this.isLoginModal) {
      const name = form.value.name
      const repeatedPassword = form.value.repeatedPassword
    }
  }

  changeToSignup() {
    this.isLoginModal = false
  }

  changeToLogin() {
    this.isLoginModal = true
  }
}
