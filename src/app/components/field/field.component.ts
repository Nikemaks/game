import {Component, OnInit, ViewChild} from '@angular/core';
import Map from "../../interfaces/map";
import {DataService} from "../../services/data.service";
import {ModalComponent} from "../modal/modal.component";
import {ControlsComponent} from "../controls/controls.component";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  amountFields: Map[];
  game: number;
  currentIndexField: number;
  countData = this.dataService.countCurrent;
  countFields: number = 100;
  @ViewChild(ModalComponent) viewChildModal: ModalComponent;
  @ViewChild(ControlsComponent) viewChildControls: ControlsComponent;

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    this.amountFields = this.dataService.createMap(this.countFields);
  }

  startGame(time): void {
    let previousItem;
    this.game = setInterval(() => {
      this.currentIndexField = this.dataService.findIndex(this.amountFields);
      if (this.dataService.gameIsEnd()) {
        this.viewChildModal.toggleModal();
        return clearInterval(this.game);
      }
      if (previousItem && !this.amountFields[previousItem].isWin) {
        this.amountFields[previousItem].isLost = true;
        this.dataService.setCountComp(this.countData.countComp++);
        this.viewChildControls.updateCounter();
      }
      while (this.amountFields[this.currentIndexField].isActive) {
        this.currentIndexField = this.dataService.findIndex(this.amountFields);
      }
      this.amountFields[this.currentIndexField].isActive = true;
      previousItem = this.currentIndexField;
    }, time);
  }

  mouseEnter(event) {
    const idElemHover = +event.currentTarget.dataset.id;
    if (!this.dataService.gameIsEnd() && idElemHover === this.currentIndexField) {
      this.amountFields[idElemHover].isWin = true;
      this.dataService.setCountUser(this.countData.countUser++);
      this.viewChildControls.updateCounter();
    }
  }

  endGame() {
    this.dataService.resetGame();
    this.countData = this.dataService.countCurrent;
    this.viewChildControls.updateCounter();
    this.amountFields = this.dataService.createMap(this.countFields);
  }
}
