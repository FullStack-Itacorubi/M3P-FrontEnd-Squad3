import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/services/patients.service';
import { QueryService } from 'src/app/services/query.service';
import { Consulta } from "src/app/services/query.service";

interface QueryInfo {
  motive: string,
  date: Date,
  time: Time,
  description: string,
  medication: string,
  dosage: string,
  status: boolean
}

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent {

  consulta!: Consulta;
  formQuery!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService,
    private patientsService: PatientsService,
  ){}

  ngOnInit() {
    this.formQuery = this.formBuilder.group({
      motive: ['', 
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64) 
      ],
      date: [new Date(), Validators.required],
      time: [new Date(), Validators.required],
      description: ['',
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(1024) 
      ],
      medication: [''],
      dosage: ['',
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(256) 
      ],
      status: false
    });

    this.loadPatients(this.consulta);
  }

  loadPatients(consulta: Consulta){
    this.patientsService.getPatients()
  /*   .subscribe(patients => {
      this.patients = patients;
    }); */
  }

  saveQuery() {
    if (!this.formQuery.valid) {
      alert('Formulário inválido, por favor corrija seus dados.');
    } else {
      alert('Dados cadastrados com sucesso!')
    }

    const consulta = new Consulta();
    consulta.motive = this.formQuery.get('motive')?.value;
    consulta.date = this.formQuery.get('date')?.value;
    consulta.time = this.formQuery.get('time')?.value;
    consulta.description = this.formQuery.get('description')?.value;
    consulta.medication = this.formQuery.get('medication')?.value;
    consulta.dosage = this.formQuery.get('dosage')?.value;
    consulta.status = this.formQuery.get('status')?.value;
      
    consulta.id = Date.now();
  }

  cleanForm() {
    this.formQuery.reset();
    this.consulta = new Consulta();
  }

  editQuery(consulta: Consulta){
    this.consulta = consulta;
    this.formQuery = this.formBuilder.group(consulta);
  }

  deleteQuery(consulta: Consulta){
    this.queryService.deleteConsulta(consulta) 
  }


}
