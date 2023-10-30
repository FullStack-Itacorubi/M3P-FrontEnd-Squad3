import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalService } from 'src/app/shared/services/modal.service';

@Component( {
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: [ './contact-admin.component.css' ]
} )
export class ContactAdminComponent {
  contactAdminForm!: FormGroup;

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.contactAdminForm = new FormGroup(
      {
        email: new FormControl(
          "",
          [
            Validators.required,
            Validators.email,
          ]
        )
      },
      {
        updateOn: "change",
      }
    );
  }

  onSubmit() {
    this.modalService.close();
  }

  close() {
    this.modalService.close();
  }
}
