import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delay-search-input',
  templateUrl: './delay-search-input.component.html',
  styleUrls: ['./delay-search-input.component.css'],
})
export class DelaySearchInputComponent {
  @Output() inputEmitter = new EventEmitter<string>();
  input = '';
  timeoutHandler?: ReturnType<typeof setTimeout>;

  onInput() {
    if (this.timeoutHandler) clearTimeout(this.timeoutHandler);
    this.timeoutHandler = setTimeout(() => {
      this.inputEmitter.emit(this.input.toLowerCase());
    }, 700);
  }
}
