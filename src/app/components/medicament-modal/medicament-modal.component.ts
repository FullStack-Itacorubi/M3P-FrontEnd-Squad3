import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LabMedicalApiService } from 'src/app/shared/services/lab-medical-api.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { endpoints } from 'src/app/shared/utils/endpoints';
import { Medicament } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-medicament-modal',
  templateUrl: './medicament-modal.component.html',
  styleUrls: ['./medicament-modal.component.css'],
})
export class MedicamentModalComponent implements OnInit {
  @ViewChild('medicament') select?: ElementRef<HTMLSelectElement>;
  medicaments?: Medicament[];

  constructor(
    private LabMedicalApiService: LabMedicalApiService,
    private modalService: ModalService
  ) {}

  async ngOnInit() {
    this.medicaments = await this.LabMedicalApiService.getAll(
      endpoints.medicament
    );
  }

  selectMedicament() {
    if (this.select) {
      const id: number = +this.select.nativeElement.value;
      this.modalService.setResponse<Medicament>(
        this.medicaments ? this.medicaments[id - 1] : null
      );
    }
    this.modalService.close();
  }
}
