import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.css'],
})
export class FormButtonsComponent {
  @Input() isCreating = true;
  @Output() handleEdit = new EventEmitter();
  @Output() handleDelete = new EventEmitter();
  @Output() handleSave = new EventEmitter();

  onEdit() {
    this.handleEdit.emit();
  }

  onDelete() {
    this.handleDelete.emit();
  }

  onSave() {
    this.handleSave.emit();
  }
}
