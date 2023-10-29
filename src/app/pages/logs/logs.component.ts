import { Component, Input, OnInit } from '@angular/core';
import { LabMedicalApiService } from 'src/app/shared/services/lab-medical-api.service';
import { endpoints } from 'src/app/shared/utils/endpoints';
import { Logs } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css', '../../app.component.css'],
})
export class LogsComponent implements OnInit {
  logs: Logs[] = [];

  constructor(private labMedicalApiService: LabMedicalApiService) {}

  async ngOnInit() {
    this.logs = await this.labMedicalApiService.getAll(endpoints.logs);
  }
}
