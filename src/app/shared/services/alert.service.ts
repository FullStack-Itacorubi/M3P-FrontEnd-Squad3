import { EventEmitter, Injectable } from '@angular/core';
import { ToastMessage } from '../components/toast-alert/toast-alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertEmitter = new EventEmitter<ToastMessage>();

  constructor() {}

  getEmitter() {
    return this.alertEmitter;
  }

  emit(message: ToastMessage) {
    this.alertEmitter.emit(message);
  }
}
