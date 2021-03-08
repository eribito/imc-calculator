import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    const msg = `IMC = ${imc.toFixed(2)} - ${this.imcClassification(imc)}`;
    this.showMessage(msg);
  }

  imcClassification(imc: number) {
    if (imc < 18.5) {
      return 'MAGREZA';
    }
    if (imc < 24.5) {
      return 'NORMAL';
    }
    if (imc < 30) {
      return 'SOBREPESO';
    }
    if (imc < 40) {
      return 'OBESIDADE';
    }
    else {
      return 'OBESIDADE GRAVE';
    }
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
