import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicamentService } from 'src/app/shared/services/medicament.service';
import { Medicament } from 'src/app/shared/utils/types';

const MedicamentTypesValues = {
  Cápsula: 'CAPSULE',
  Comprimido: 'PILL',
  Líquido: 'LIQUID',
  Creme: 'CREAM',
  Gel: 'GEL',
  Inalação: 'INHALATION',
  Injeção: 'INJECTION',
  Spray: 'SPRAY',
};

type MedicamentType =
  | 'Cápsula'
  | 'Comprimido'
  | 'Líquido'
  | 'Creme'
  | 'Gel'
  | 'Inalação'
  | 'Injeção'
  | 'Spray';

const MedicamentUnitsValues = {
  mg: 'MG',
  mcg: 'MCG',
  g: 'G',
  ml: 'ML',
  '%': 'PERCENTAGE',
};

type MedicamentUnit = 'mg' | 'mcg' | 'g' | 'ml' | '%';

type Medicamentsinfos = {
  name: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  type: FormControl<string | null>;
  quantity: FormControl<number | null>;
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
      name: new FormControl('', [
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
      quantity: new FormControl(null, [Validators.required]),
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

  populateForm(medicament: Medicament) {
    const type = medicament.type as MedicamentType;
    const unit = medicament.unit as MedicamentUnit;
    this.formMedicaments.get('name')?.setValue(medicament.name);
    this.formMedicaments.get('date')?.setValue(medicament.date ?? null);
    this.formMedicaments.get('date')?.disable();
    this.formMedicaments.get('time')?.setValue(medicament.time ?? null);
    this.formMedicaments.get('time')?.disable();
    this.formMedicaments.get('type')?.setValue(MedicamentTypesValues[type]);
    this.formMedicaments.get('quantity')?.setValue(medicament.quantity);
    this.formMedicaments.get('unit')?.setValue(MedicamentUnitsValues[unit]);
    this.formMedicaments.get('observations')?.setValue(medicament.observations);
    this.formMedicaments.get('status')?.setValue(medicament.status);
    this.formMedicaments.get('status')?.enable();
  }

  saveMedicament() {
    if (!this.formMedicaments.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
      return;
    }

    if (this.isCreating) {
      this.registerMedicament();
      return;
    }

    this.updateMedicament();
  }

  private registerMedicament() {
    const dateFormated = this.formMedicaments.value
      .date!.split('-')
      .reverse()
      .join('/');

    const medicament: Medicament = {
      name: this.formMedicaments.value.name!,
      date: dateFormated!,
      time: this.formMedicaments.value.time! + ':00',
      type: this.formMedicaments.value.type!,
      quantity: this.formMedicaments.value.quantity!,
      unit: this.formMedicaments.value.unit!,
      observations: this.formMedicaments.value.observations!,
      status: this.formMedicaments.value.status!,
    };

    this.medicamentService.saveMedicament(medicament);
    this.initMedicamentsForm();
    alert('Medicamento cadastrado com sucesso!');
  }

  private updateMedicament() {
    const medicament: Medicament = {
      id: this.medicamentId,
      name: this.formMedicaments.value.name!,
      type: this.formMedicaments.value.type!,
      quantity: this.formMedicaments.value.quantity!,
      unit: this.formMedicaments.value.unit!,
      observations: this.formMedicaments.value.observations!,
      status: this.formMedicaments.value.status!,
    };

    this.medicamentService.updateMedicament(medicament);
    alert('Medicamento editado com sucesso!');
  }
}
