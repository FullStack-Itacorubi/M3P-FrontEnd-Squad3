import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicamentService } from 'src/app/shared/services/medicament.service';
import { Medicament } from 'src/app/shared/utils/types';

type Medicamentsinfos = {
  medicamentsName: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  type: FormControl<string | null>;
  amount: FormControl<number | null>;
  unit: FormControl<string | null>;
  observations: FormControl<string | null>;
  status: FormControl<boolean | null>;
};

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css', '../../app.component.css'],
})
export class MedicamentsComponent implements OnInit {
  formMedicaments!: FormGroup<Medicamentsinfos>;
  isCreating = true;
  medicamentId = -1;

  constructor(
    private medicamentService: MedicamentService,
    route: ActivatedRoute
  ) {
    this.formMedicaments = this.initMedicamentsForm();
    if (Object.hasOwn(route.snapshot.params, 'medicamentId')) {
      this.isCreating = false;
      this.medicamentId = route.snapshot.params['medicamentId'];
    }
  }

  async ngOnInit() {
    if (this.isCreating) return;

    const medicament = await this.medicamentService.getMedicamentById(
      this.medicamentId
    );
    this.populateForm(medicament);
  }

  initMedicamentsForm() {
    const today = new Date();
    return new FormGroup<Medicamentsinfos>({
      medicamentsName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      date: new FormControl(today.toISOString().substring(0, 10), [
        Validators.required,
      ]),
      time: new FormControl(today.toLocaleTimeString('pt-BR').substring(0, 5), [
        Validators.required,
      ]),
      type: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      observations: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ]),
      status: new FormControl({ value: true, disabled: true }, [
        Validators.required,
      ]),
    });
  }

  populateForm(medicament: Medicament) {}

  registerMedicament() {
    if (!this.formMedicaments.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
      return;
    } else {
      alert('Dados cadastrados com sucesso!');
    }

    const dateFormated = this.formMedicaments.value
      .date!.split('-')
      .reverse()
      .join('/');

    const medicament: Medicament = {
      name: this.formMedicaments.value.medicamentsName!,
      date: dateFormated!,
      time: this.formMedicaments.value.time! + ':00',
      type: this.formMedicaments.value.type!,
      quantity: this.formMedicaments.value.amount!,
      unit: this.formMedicaments.value.unit!,
      observations: this.formMedicaments.value.observations!,
      status: this.formMedicaments.value.status!,
    };

    this.medicamentService.saveMedicaments(medicament);

    this.initMedicamentsForm();
  }
}
