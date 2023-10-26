import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../../shared/services/exercise.service';
import { Exercise, Patient } from 'src/app/shared/utils/types';
import { PatientsService } from 'src/app/shared/services/patients.service';

type Exerciseinfos = {
  name: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  patientId: FormControl<number | null>;
  type: FormControl<string | null>;
  weeklyAmount: FormControl<number | null>;
  description: FormControl<string | null>;
  status: FormControl<boolean | null>;
};

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css', '../../app.component.css'],
})
export class ExerciseComponent implements OnInit {
  formsExerciseRegister: FormGroup<Exerciseinfos>;

  patients: Patient[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private patientsService: PatientsService
  ) {
    this.formsExerciseRegister = this.initExerciseForm();
  }

  async ngOnInit() {
    this.patients = await this.patientsService.getPatients();
  }

  initExerciseForm() {
    const today = new Date();
    return new FormGroup<Exerciseinfos>({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      date: new FormControl(today.toISOString().substring(0, 10), 
        [Validators.required]),
      time: new FormControl(
        today.toLocaleTimeString('pt-BR').substring(0, 5),
        [Validators.required]
      ),
      patientId: new FormControl(null, [Validators.required]),
      type: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      weeklyAmount: new FormControl(null, [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ]),
      status: new FormControl({ value: true, disabled: true },
        [Validators.required]),
    });
  }

  async registerExercise() {
    if (!this.formsExerciseRegister.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
      return
    } else {
      alert('Dados cadastrado com sucesso!');
      return
    }

    const dateFormated = this.formsExerciseRegister.value
      .date!.split('-')
      .reverse()
      .join('/');

    const exercise: Exercise = {
      name: this.formsExerciseRegister.value.name!,
      date: dateFormated,
      time: this.formsExerciseRegister.value.time! + ':00',
      patientId: this.formsExerciseRegister.value.patientId!,
      type: this.formsExerciseRegister.value.type!,
      weeklyAmount: this.formsExerciseRegister.value.weeklyAmount!,
      description: this.formsExerciseRegister.value.description!,
      status: this.formsExerciseRegister.value.status!,
    };

    this.formsExerciseRegister = this.initExerciseForm();
    await this.exerciseService.saveExercises(exercise);
  }
}
