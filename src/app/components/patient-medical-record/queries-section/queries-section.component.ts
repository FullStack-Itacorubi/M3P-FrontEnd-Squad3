import { Component, Input } from '@angular/core';
import { QueryResponse } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-queries-section',
  templateUrl: './queries-section.component.html',
  styleUrls: ['./queries-section.component.css'],
})
export class QueriesSectionComponent {
  @Input() queries: QueryResponse[] = [];
}
