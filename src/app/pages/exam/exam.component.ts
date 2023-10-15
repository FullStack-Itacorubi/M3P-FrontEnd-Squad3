import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamService } from 'src/app/services/exam.service';

interface Examinfos {
  examName: FormControl<string | null>;
  examDate: FormControl<string | null>;
  examHour: FormControl<string | null>;
  examType: FormControl<string | null>;
  laboratory: FormControl<string | null>;
  documetnUrl: FormControl<string | null>;
  results: FormControl<string | null>;
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent {
  formsExamRegister: FormGroup<Examinfos> = new FormGroup({
    examName: new FormControl(''),
    examDate: new FormControl(''),
    examHour: new FormControl(''),
    examType: new FormControl(''),
    laboratory: new FormControl(''),
    documetnUrl: new FormControl(''),
    results: new FormControl(''),
  });

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.initExamForm();
  }

  initExamForm(){
    this.formsExamRegister = new FormGroup({
      examName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      examDate: new FormControl('', [Validators.required]),
      examHour: new FormControl('', [Validators.required]),
      examType: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      laboratory: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      documetnUrl: new FormControl(''),
      results: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024),
      ]),
    })

  }
}
