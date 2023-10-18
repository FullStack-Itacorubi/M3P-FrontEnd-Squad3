import { Injectable } from '@angular/core';

export interface diet {
  dietName: string;
  type: string;
  dietDate: string;
  dietTime: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor() { }
}
