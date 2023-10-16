import { Time } from '@angular/common';
import { Injectable } from '@angular/core';

export class Consulta {
  id: number | undefined;
  motive: string | undefined;
  date: Date | undefined;
  time: Time | undefined;
  description: string | undefined;
  medication: string | undefined;
  dosage: string | undefined;
  status: boolean | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor() { }

  saveConsulta(consulta: Consulta) {}

  deleteConsulta(consulta: Consulta) {}
}
