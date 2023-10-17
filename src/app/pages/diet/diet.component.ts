import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DietService } from 'src/app/services/diet.service';

interface Dietinfos {
  dietName: FormControl<string | null>;
  type: FormControl<string | null>;
  dietDate: FormControl<string | null>;
  dietTime: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css'],
})
export class DietComponent {
  formsDietRegister: FormGroup<Dietinfos> = new FormGroup({
    dietName: new FormControl(''),
    type: new FormControl(''),
    dietDate: new FormControl(''),
    dietTime: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private dietService: DietService) {}

  ngOnInit(): void {
    this.initDietForm();
  }

  initDietForm() {
    this.formsDietRegister = new FormGroup({
      dietName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      type: new FormControl('', [Validators.required]),
      dietDate: new FormControl('', [Validators.required]),
      dietTime: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ]),
    });
  }
}
