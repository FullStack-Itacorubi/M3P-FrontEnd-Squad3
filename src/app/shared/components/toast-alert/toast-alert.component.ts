import { Component, OnInit } from '@angular/core';

export type ToastMessage = {
  text: string;
  class?: string;
};

@Component({
  selector: 'app-toast-alert',
  templateUrl: './toast-alert.component.html',
  styleUrls: ['./toast-alert.component.css'],
})
export class ToastAlertComponent implements OnInit {
  messages: ToastMessage[] = [];
  isShowing = false;
  endAnimation = false;
  removeHandler?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    setTimeout(() => {
      this.addMessage({ text: 'Usuário cadastrado com sucesso', class: '' });
      this.addMessage({ text: 'Paciente cadastrado com sucesso', class: '' });
      this.addMessage({ text: 'Exame cadastrado com sucesso', class: '' });
    }, 2000);
  }

  addMessage(message: ToastMessage) {
    this.messages.push(message);
    if (!this.isShowing) {
      this.isShowing = true;
      this.endAnimation = false;
      this.removeHandler = setTimeout(() => this.removeMessage(), 4000);
      return;
    }
  }

  hide() {
    this.endAnimation = true;
    clearTimeout(this.removeHandler);
    setTimeout(() => this.removeMessage(), 400);
  }

  private removeMessage() {
    this.isShowing = false;
    this.endAnimation = false;
    this.messages.shift();
    setTimeout(() => this.showAnotherMessage(), 400);
  }

  private showAnotherMessage() {
    console.log(this.messages);
    if (this.messages.length === 0) return;
    this.isShowing = true;
    this.removeHandler = setTimeout(() => this.removeMessage(), 4000);
  }
}
