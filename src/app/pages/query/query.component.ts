import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicamentModalComponent } from 'src/app/components/medicament-modal/medicament-modal.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { QueryService } from 'src/app/shared/services/query.service';
import { Query, Patient, Medicament } from 'src/app/shared/utils/types';

type Queriesinfos = {
  motive: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  description: FormControl<string | null>;
  medication: FormControl<string | null>;
  dosage: FormControl<string | null>;
  patientId: FormControl<number | null>;
  status: FormControl<boolean | null>;
};

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css', '../../app.component.css'],
})
export class QueryComponent implements OnInit {
  formQuery: FormGroup<Queriesinfos>;

  patients: Patient[] = [];
  medicaments: Medicament[] = [];

  constructor(
    private patientService: PatientsService,
    private queryService: QueryService,
    private modalService: ModalService
  ) {
    this.formQuery = this.initQueryForm();
  }

  async ngOnInit() {
    this.patients = await this.patientService.getPatients();
  }

  initQueryForm() {
    return new FormGroup<Queriesinfos>({
      motive: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024),
      ]),
      medication: new FormControl(''),
      dosage: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(256),
      ]),
      patientId: new FormControl(null, [Validators.required]),
      status: new FormControl({ value: true, disabled: true }, [
        Validators.required,
      ]),
    });
  }

  registerQuery() {
    if (!this.formQuery.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
      return;
    } else {
      alert('Dados cadastrados com sucesso!');
    }

    const dateFormated = this.formQuery.value
      .date!.split('-')
      .reverse()
      .join('/');

    const query: Query = {
      reasonForConsultation: this.formQuery.value.motive!,
      consultationDate: dateFormated,
      consultationTime: this.formQuery.value.time! + ':00',
      problemDescription: this.formQuery.value.description!,
      medicaments: this.medicaments,
      dosageAndRecautions: this.formQuery.value.dosage!,
      patientId: this.formQuery.value.patientId!,
      status: this.formQuery.value.status!,
    };

    this.queryService.saveQuery(query);

    this.initQueryForm();
  }

  openModal() {
    this.modalService.open(MedicamentModalComponent, undefined);
    this.modalService
      .responseObservable<Medicament>()
      .subscribe((medicament) => {
        this.medicaments.push(medicament);
      });
  }
}
