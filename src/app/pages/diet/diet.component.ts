import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DietService } from 'src/app/shared/services/diet.service';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { Diet, Patient } from 'src/app/shared/utils/types';

type Dietinfos = {
  dietName: FormControl<string | null>;
  type: FormControl<string | null>;
  patientId: FormControl<number | null>;
  dietDate: FormControl<string | null>;
  dietTime: FormControl<string | null>;
  status: FormControl<boolean | null>;
  description: FormControl<string | null>;
};

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css', '../../app.component.css'],
})
export class DietComponent implements OnInit {
  formsDietRegister: FormGroup<Dietinfos>;
  isCreating = true;
  dietId = -1;

  patients: Patient[] = [];

  constructor(
    private dietService: DietService,
    private patientsService: PatientsService,
    private route: ActivatedRoute
  ) {
    this.formsDietRegister = this.initDietForm();
    if (Object.hasOwn(route.snapshot.params, 'dietId')) {
      this.isCreating = false;
      this.dietId = route.snapshot.params['dietId'];
    }
  }

  async ngOnInit() {
    this.patients = await this.patientsService.getPatients();
    if (this.isCreating) return;

    const diet = await this.dietService.getDietById(this.dietId);
    this.populateForm(diet);
  }

  initDietForm() {
    const today = new Date();
    return new FormGroup<Dietinfos>({
      dietName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      type: new FormControl('', [Validators.required]),
      patientId: new FormControl(null, [Validators.required]),
      dietDate: new FormControl(today.toISOString().substring(0, 10), [
        Validators.required,
      ]),
      dietTime: new FormControl(
        today.toLocaleTimeString('pt-BR').substring(0, 5),
        [Validators.required]
      ),
      status: new FormControl({ value: true, disabled: true }, [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ]),
    });
  }

  populateForm(diet: Diet) {
    this.formsDietRegister.get('dietName')?.setValue(diet.dietName);
    this.formsDietRegister.get('dietDate')?.setValue(diet.dietDate);
    this.formsDietRegister.get('dietTime')?.setValue(diet.dietTime);
    this.formsDietRegister.get('description')?.setValue(diet.description);
    this.formsDietRegister.get('type')?.setValue(diet.type);
    this.formsDietRegister.get('status')?.setValue(diet.status);
    this.formsDietRegister.get('status')?.enable();
    this.formsDietRegister
      .get('patientId')
      ?.setValue(window.history.state.patientId);
    this.formsDietRegister.get('patientId')?.disable();
  }

  saveDiet() {
    if (!this.formsDietRegister.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
      return;
    }

    if (this.isCreating) {
      this.registerDiet();
      return;
    }

    this.updateDiet();
  }

  deleteDiet() {
    this.dietService.deleteDiet(this.dietId, window.history.state.patientId);
    alert('Dieta deletada com sucesso!');
  }

  async registerDiet() {
    const dateFormated = this.formsDietRegister.value
      .dietDate!.split('-')
      .reverse()
      .join('/');

    const diet: Diet = {
      dietName: this.formsDietRegister.value.dietName!,
      type: this.formsDietRegister.value.type!,
      patientId: this.formsDietRegister.value.patientId!,
      dietDate: dateFormated,
      dietTime: this.formsDietRegister.value.dietTime! + ':00',
      status: this.formsDietRegister.value.status!,
      description: this.formsDietRegister.value.description!,
    };

    this.formsDietRegister = this.initDietForm();
    await this.dietService.saveDiet(diet);
    alert('Dados cadastrado com sucesso!');
  }

  async updateDiet() {
    const dateFormated = this.formsDietRegister.value
      .dietDate!.split('-')
      .reverse()
      .join('/');

    const diet: Diet = {
      id: this.dietId,
      dietName: this.formsDietRegister.value.dietName!,
      type: this.formsDietRegister.value.type!,
      patientId: this.formsDietRegister.value.patientId!,
      dietDate: dateFormated,
      dietTime: this.formsDietRegister.value.dietTime!,
      status: this.formsDietRegister.value.status!,
      description: this.formsDietRegister.value.description!,
    };

    await this.dietService.updateDiet(diet);
    this.formsDietRegister = this.initDietForm();
    alert('Dados alterados com sucesso!');
  }
}
