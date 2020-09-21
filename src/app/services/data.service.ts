import { Injectable } from '@angular/core';
import Map from "../interfaces/map";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  countUser: number = 0;
  countComp: number = 0;

  constructor() { }

  createMap(countField): Map[] {
    const fields = new Array(countField).fill('');
    return fields.map((elem, index) => {
      return {
        id: index,
        isActive: false,
        isWin: false,
        isLost: false
      }
    });
  }

  findIndex(amountFields): number {
    const min = 0;
    const max = amountFields.length - 1;
    return Math.ceil(Math.random() * (max - min) + min);
  }

  setCountUser(countUser): void {
    this.countUser = countUser
  }

  setCountComp(countComp): void {
    this.countComp = countComp
  }

  gameIsEnd(): boolean {
     let {countUser, countComp} = this.countCurrent;
     return (countUser >= 10) || (countComp >= 10);
  }

  resetGame(): void {
    this.countUser = 0;
    this.countComp = 0;

  }

  get countCurrent(): any {
    return {
      countUser: this.countUser,
      countComp: this.countComp
    }
  }

}
