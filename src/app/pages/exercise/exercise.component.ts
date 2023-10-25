import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from 'src/app/shared/utils/types';

interface Exerciseinfos {
  name: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  type: FormControl<string | null>;
  weeklyAmount: FormControl<number | null>;
  description: FormControl<string | null>;
  status: FormControl<boolean | null>;

}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css', '../../app.component.css'],
})
export class ExerciseComponent {
  formsExerciseRegister: FormGroup<Exerciseinfos>; 

  constructor(private exerciseService: ExerciseService) {
    this.formsExerciseRegister = this.initExerciseForm();
  }

  initExerciseForm() {
    const today = new Date();
    return new FormGroup<Exerciseinfos>({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      date: new FormControl(today.toISOString().substring(0, 10), [Validators.required]),
      time: new FormControl(today.toLocaleTimeString('pt-BR').substring(0, 5), [Validators.required]),
      type: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      weeklyAmount: new FormControl(0, [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ]),
      status: new FormControl({ value: true, disabled: true }),
    });
  }

  async registerExercise() {
    if (!this.formsExerciseRegister.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrado com sucesso!');
    }

    const dateFormated = this.formsExerciseRegister.value.date!.split('-').reverse().join('/'); 

    const exercise: Exercise = {
      patientId: 1,
      name: this.formsExerciseRegister.value.name!,
      date: dateFormated,
      time: this.formsExerciseRegister.value.time! + ':00',
      type: this.formsExerciseRegister.value.type!,
      weeklyAmount: this.formsExerciseRegister.value.weeklyAmount!,
      description: this.formsExerciseRegister.value.description!,
      status: this.formsExerciseRegister.value.status!,
    };

    this.formsExerciseRegister = this.initExerciseForm();
    await this.exerciseService.saveExercises(exercise);
  }
}
