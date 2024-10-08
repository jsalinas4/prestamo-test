import { Injectable } from '@angular/core';
import { CXP } from '../models/cxp.model';

@Injectable({
  providedIn: 'root',
})
export class CXPService {
  private cxps: CXP[] = [];

  registerCXP(cxp: CXP) {
    this.cxps.push(cxp);
  }

  getCXPs(): CXP[] {
    return this.cxps;
  }
}
