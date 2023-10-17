import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../exercise.service';


interface Exerciseinfos {
  name: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  type: FormControl<string | null>;
  weeklyAmount: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent {
  formsExerciseRegister: FormGroup<Exerciseinfos> = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    type: new FormControl(''),
    weeklyAmount: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.initExerciseForm();
  }

  initExerciseForm(){
    this.formsExerciseRegister = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      type: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      weeklyAmount: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ]),
    })

  }

  registerExercise() {
    if (!this.formsExerciseRegister.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrado com sucesso!');
    }

    const user = {
      name: this.formsExerciseRegister.value.name!,
      date: this.formsExerciseRegister.value.date!,
      time: this.formsExerciseRegister.value.time!,
      type: this.formsExerciseRegister.value.type!,
      weeklyAmount: this.formsExerciseRegister.value.weeklyAmount!,
      description: this.formsExerciseRegister.value.description!,
    }

    this.initExerciseForm();
  }

}
