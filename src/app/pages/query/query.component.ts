import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/shared/services/patient.service';
import { QueryService } from 'src/app/shared/services/query.service';
import { Query, Patient, Medicament } from "src/app/shared/utils/types";

type Queriesinfos = {
  motive: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  description: FormControl<string | null>;
  medication: FormControl<string | null>;
  dosage: FormControl<string | null>;
  patientId: FormControl<number | null>;
  status: FormControl<boolean | null>;
}

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent {

  formQuery: FormGroup<Queriesinfos>;

  patients: Patient[] = [];

  constructor (
    private patientService: PatientService,
    private queryService: QueryService,
  ) {
    this.formQuery = this.initQueryForm()
  }

  ngOnInit(): void {
    this.initQueryForm();
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
        Validators.maxLength(1024)
      ]),
      medication: new FormControl(''),
      dosage: new FormControl('', [
        Validators.required, 
        Validators.minLength(16), 
        Validators.maxLength(256)
      ]),
      patientId: new FormControl( null , [Validators.required]),
      status: new FormControl({value: true, disabled: true}, [Validators.required]),
    });
  }

  registerQueries() {
    if (!this.formQuery.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrados com sucesso!');
    }

    const medicaments: Medicament[] = []

    const query: Query = {
      reasonForConsultation: this.formQuery.value.motive!,
      consultationDate: this.formQuery.value.date!,
      consultationTime: this.formQuery.value.time!,
      problemDescription: this.formQuery.value.description!,
      medicaments,
      dosageAndRecautions: this.formQuery.value.dosage!,
      patientId: this.formQuery.value.patientId!,
      status: this.formQuery.value.status!,
    };

    this.initQueryForm();
  }

}
