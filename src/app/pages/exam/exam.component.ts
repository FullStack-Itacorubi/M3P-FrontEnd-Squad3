import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamService } from 'src/app/shared/services/exam.service';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { Exam, Patient } from 'src/app/shared/utils/types';

type Examinfos = {
  examName: FormControl<string | null>;
  examDate: FormControl<string | null>;
  examHour: FormControl<string | null>;
  examType: FormControl<string | null>;
  laboratory: FormControl<string | null>;
  documentUrl: FormControl<string | null>;
  patientId: FormControl<number | null>;
  status: FormControl<boolean | null>;
  results: FormControl<string | null>;
};

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css', '../../app.component.css'],
})
export class ExamComponent implements OnInit {
  formsExamRegister: FormGroup<Examinfos>;

  patients: Patient[] = [];

  constructor(
    private examService: ExamService,
    private patientsService: PatientsService
  ) {
    this.formsExamRegister = this.initExamForm();
  }

  async ngOnInit() {
   this.patients = await this.patientsService.getPatients();
  }

  initExamForm() {
    const today = new Date();
    return new FormGroup<Examinfos>({
      examName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      examDate: new FormControl(today.toISOString().substring(0, 10), [
        Validators.required,
      ]),
      examHour: new FormControl(
        today.toLocaleTimeString('pt-BR').substring(0, 5),
        [Validators.required]
      ),
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
      documentUrl: new FormControl(''),
      patientId: new FormControl(),
      status: new FormControl({ value: true, disabled: true }),
      results: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024),
      ]),
    });
  }

  async registerExam() {
    if (!this.formsExamRegister.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrado com sucesso!');
    }

    const dateFormated = this.formsExamRegister.value
      .examDate!.split('-')
      .reverse()
      .join('/');

    const exam: Exam = {
      examName: this.formsExamRegister.value.examName!,
      examDate: dateFormated,
      examHour: this.formsExamRegister.value.examHour! + ':00',
      examType: this.formsExamRegister.value.examType!,
      laboratory: this.formsExamRegister.value.laboratory!,
      documentUrl: this.formsExamRegister.value.documentUrl!,
      patientId: this.formsExamRegister.value.patientId!,
      status: this.formsExamRegister.value.status!,
      results: this.formsExamRegister.value.results!,
    };

    this.formsExamRegister = this.initExamForm();
    await this.examService.saveExams(exam);
  }
}
