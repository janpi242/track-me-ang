import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { ModalController } from '@ionic/angular'
import { RestService } from '../services/rest.service'
import { UserService } from '../services/user.service'

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

  isUserLoggedIn = false
  username = '123'

  constructor(private modalCtrl: ModalController,
    private restService: RestService,
    private userService: UserService) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm')
  }

  onSubmit(form: NgForm) {
    console.log(`is form valid?: ${form.valid}`);
    if (!form.valid) {
      return
    }
    const email = form.value.email
    const password = form.value.password
    if (!this.isLoginModal) {
      console.log('submiting');
      const name = form.value.name
      const repeatedPassword = form.value.repeatedPassword
      this.restService.getToken().subscribe((resp) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.restService.register({ email, password, name, password_confirmation: repeatedPassword })
          .subscribe(responseData => { console.log(responseData) });
      })
    } else {
      this.restService.login({ email, password })
        .subscribe(responseData => {
          console.log(responseData);
          console.log(this.userService)
          this.userService.logInUser('usernameXXX', responseData.access_token)
        })
    }
  }

  changeToSignup() {
    this.isLoginModal = false
  }

  changeToLogin() {
    this.isLoginModal = true
  }
}
