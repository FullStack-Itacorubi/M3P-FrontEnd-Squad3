import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LabMedicalApiService } from 'src/app/shared/services/lab-medical-api.service';
import { endpoints } from 'src/app/shared/utils/endpoints';
import { Diet, Patient } from 'src/app/shared/utils/types';

const DietTypesValues = {
  'Low Carb': 'LOW_CARB',
  Dash: 'DASH',
  Paleolítica: 'PALEOLITHIC',
  Cetogênica: 'KETOGENIC',
  Dukan: 'DUKAN',
  Mediterrânea: 'MEDITERRANEAN',
  Outra: 'OTHER',
};

type DietType =
  | 'Low Carb'
  | 'Dash'
  | 'Paleolítica'
  | 'Cetogênica'
  | 'Dukan'
  | 'Mediterrânea'
  | 'Outra';

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
    private alertService: AlertService,
    private labMedicalApiApi: LabMedicalApiService,
    private route: ActivatedRoute
  ) {
    this.formsDietRegister = this.initDietForm();
    if (Object.hasOwn(route.snapshot.params, 'dietId')) {
      this.isCreating = false;
      this.dietId = route.snapshot.params['dietId'];
    }
  }

  async ngOnInit() {
    this.patients = await this.labMedicalApiApi.getAll(endpoints.patient);
    if (this.isCreating) return;

    const patientId = window.history.state.patientId;
    const diet = await this.labMedicalApiApi.getById<Diet>(
      endpoints.diet,
      this.dietId
    );
    this.populateForm(diet, patientId);
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

  populateForm(diet: Diet, patientId: number) {
    const type = diet.type as DietType;
    this.formsDietRegister.get('dietName')?.setValue(diet.dietName);
    this.formsDietRegister.get('dietDate')?.setValue(diet.dietDate);
    this.formsDietRegister.get('dietTime')?.setValue(diet.dietTime);
    this.formsDietRegister.get('description')?.setValue(diet.description);
    this.formsDietRegister.get('type')?.setValue(DietTypesValues[type]);
    this.formsDietRegister.get('status')?.setValue(diet.status);
    this.formsDietRegister.get('status')?.enable();
    this.formsDietRegister.get('patientId')?.setValue(patientId);
    this.formsDietRegister.get('patientId')?.disable();
  }

  saveDiet() {
    if (!this.formsDietRegister.valid) {
      this.alertService.emit({
        text: 'Formulário inválido, por favor insira ou corrija seus dados!',
        class: 'border-0 bg-red-600 text-white',
      });
      return;
    }

    if (this.isCreating) {
      this.registerDiet();
      return;
    }

    this.updateDiet();
  }

  deleteDiet() {
    this.labMedicalApiApi.delete(
      endpoints.diet,
      this.dietId,
      window.history.state.patientId
    );
    this.alertService.emit({
      text: 'Dieta deletada com sucesso!',
    });
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
    await this.labMedicalApiApi.save(endpoints.diet, diet);
    this.alertService.emit({
      text: 'Dieta cadastrada com sucesso!',
    });
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

    await this.labMedicalApiApi.update(endpoints.diet, diet, this.dietId);
    this.alertService.emit({
      text: 'Dieta alterada com sucesso!',
    });
  }
}
