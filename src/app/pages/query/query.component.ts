import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Queriesinfos {
  motive: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  description: FormControl<string | null>;
  medication: FormControl<string | null>;
  dosage: FormControl<string | null>;
  status: FormControl<string | null>;
}

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent {

  formQuery: FormGroup<Queriesinfos> = new FormGroup({
    motive: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    description: new FormControl(''),
    medication: new FormControl(''),
    dosage: new FormControl(''),
    status: new FormControl(''),
  });

  ngOnInit(): void {
    this.initQueryForm();
  }

  initQueryForm() {
    this.formQuery = new FormGroup({
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
      status: new FormControl('', [Validators.required]),
    });
  }

  registerQueries() {
    if (!this.formQuery.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrados com sucesso!');
    }

    const query = {
      motive: this.formQuery.value.motive!,
      date: this.formQuery.value.date!,
      time: this.formQuery.value.time!,
      description: this.formQuery.value.description,
      medication: this.formQuery.value.medication!,
      dosage: this.formQuery.value.dosage!,
      status: this.formQuery.value.status!,
    };

    this.initQueryForm();
  }

}
