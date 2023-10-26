import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MedicamentService } from 'src/app/shared/services/medicament.service';
import { ModalService } from 'src/app/shared/services/modal.service';
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
    private medicamentsService: MedicamentService,
    private modalService: ModalService
  ) {}

  async ngOnInit() {
    this.medicaments = await this.medicamentsService.getMedicaments();
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
