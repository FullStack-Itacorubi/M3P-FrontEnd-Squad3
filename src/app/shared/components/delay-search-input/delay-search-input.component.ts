import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-delay-search-input',
  templateUrl: './delay-search-input.component.html',
  styleUrls: ['./delay-search-input.component.css'],
})
export class DelaySearchInputComponent {
  @ViewChild('searchInput') inputRef?: ElementRef<HTMLInputElement>;
  @Output() inputChange = new EventEmitter<string>();
  @Input() input = '';
  timeoutHandler?: ReturnType<typeof setTimeout>;

  onInput() {
    if (this.timeoutHandler) clearTimeout(this.timeoutHandler);
    this.timeoutHandler = setTimeout(() => {
      this.inputChange.emit(this.input.toLowerCase());
    }, 700);
  }

  selectInput() {
    this.inputRef?.nativeElement.focus();
  }
}
