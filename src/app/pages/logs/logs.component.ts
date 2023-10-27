import { Component, Input, OnInit } from '@angular/core';
import { LogsService } from 'src/app/shared/services/logs.service';
import { Logs } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css', '../../app.component.css']
})
export class LogsComponent implements OnInit {

logs: Logs[] = [];

constructor( private logsService: LogsService ){}

async ngOnInit() {
  this.logs = await this.logsService.getLogs();
}

}
