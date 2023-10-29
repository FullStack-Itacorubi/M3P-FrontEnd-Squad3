import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicamentModalComponent } from 'src/app/components/medicament-modal/medicament-modal.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MedicalRecordsService } from 'src/app/shared/services/medical-records.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { QueryService } from 'src/app/shared/services/query.service';
import {
  QueryResponse,
  Patient,
  Medicament,
  QueryMedicament,
  QueryRequest,
} from 'src/app/shared/utils/types';

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
  isCreating = true;
  queryId = -1;

  patients: Patient[] = [];
  medicaments: Medicament[] = [];

  constructor(
    private alertService: AlertService,
    private patientService: PatientsService,
    private queryService: QueryService,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {
    this.formQuery = this.initQueryForm();
    if (Object.hasOwn(route.snapshot.params, 'queryId')) {
      this.isCreating = false;
      this.queryId = route.snapshot.params['queryId'];
    }
  }

  async ngOnInit() {
    this.patients = await this.patientService.getPatients();
    if (this.isCreating) return;

    const query = await this.queryService.getQueryById(this.queryId);
    this.medicaments = query.medicaments;
    this.populateForm(query);
  }

  initQueryForm() {
    const today = new Date();
    return new FormGroup<Queriesinfos>({
      motive: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      date: new FormControl(today.toISOString().substring(0, 10), [
        Validators.required,
      ]),
      time: new FormControl(today.toLocaleTimeString('pt-BR').substring(0, 5), [
        Validators.required,
      ]),
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

  populateForm(query: QueryResponse) {
    this.formQuery.get('motive')?.setValue(query.reasonForConsultation);
    this.formQuery.get('date')?.setValue(query.consultationDate);
    this.formQuery.get('time')?.setValue(query.consultationTime);
    this.formQuery.get('description')?.setValue(query.problemDescription);
    this.formQuery.get('dosage')?.setValue(query.dosageAndRecautions);
    this.formQuery.get('status')?.setValue(query.status);
    this.formQuery.get('status')?.enable();
    this.formQuery.get('patientId')?.setValue(window.history.state.patientId);
    this.formQuery.get('patientId')?.disable();
  }

  saveQuery() {
    if (!this.formQuery.valid) {
      this.alertService.emit({
        text: 'Formulário inválido, por favor insira ou corrija seus dados!',
        class: 'bg-red-600 text-white border-0',
      });
      return;
    }

    if (this.isCreating) {
      this.registerQuery();
      return;
    }

    this.updateQuery();
  }

  deleteQuery() {
    this.queryService.deleteQuery(this.queryId, window.history.state.patientId);
    this.alertService.emit({
      text: 'Consulta excluída com sucesso!',
    });
  }

  registerQuery() {
    const dateFormated = this.formQuery.value
      .date!.split('-')
      .reverse()
      .join('/');

    const query: QueryRequest = {
      reasonForConsultation: this.formQuery.value.motive!,
      consultationDate: dateFormated,
      consultationTime: this.formQuery.value.time! + ':00',
      problemDescription: this.formQuery.value.description!,
      medicaments: this.medicaments.map(
        (medicament) => ({ id: medicament.id } as QueryMedicament)
      ),
      dosageAndRecautions: this.formQuery.value.dosage!,
      patientId: this.formQuery.value.patientId!,
      status: this.formQuery.value.status!,
    };

    this.queryService.saveQuery(query);
    this.formQuery = this.initQueryForm();
    this.alertService.emit({
      text: 'Consulta cadastrada com sucesso!',
    });
  }

  updateQuery() {
    const dateFormated = this.formQuery.value
      .date!.split('-')
      .reverse()
      .join('/');

    const query: QueryRequest = {
      id: this.queryId,
      reasonForConsultation: this.formQuery.value.motive!,
      consultationDate: dateFormated,
      consultationTime: this.formQuery.value.time!,
      problemDescription: this.formQuery.value.description!,
      medicaments: this.medicaments.map(
        (medicament) => ({ id: medicament.id } as QueryMedicament)
      ),
      dosageAndRecautions: this.formQuery.value.dosage!,
      patientId: this.formQuery.value.patientId!,
      status: this.formQuery.value.status!,
    };

    this.queryService.updateQuery(query);
    this.alertService.emit({
      text: 'Consulta editada com sucesso!',
    });
  }

  selectMedicament() {
    this.modalService.open(MedicamentModalComponent);
    this.modalService
      .responseObservable<Medicament>()
      .subscribe((medicament) => {
        this.medicaments.push(medicament);
      });
  }

  editMedicament(id?: number) {
    this.modalService.open(MedicamentModalComponent);
    this.modalService
      .responseObservable<Medicament>()
      .subscribe((medicament) => {
        this.medicaments.push(medicament);
      });
    this.deleteMedicament(id);
  }

  deleteMedicament(id?: number) {
    this.medicaments = this.medicaments.filter(
      (medicament) => medicament.id !== id
    );
  }
}
