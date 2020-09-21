import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isShow: boolean = false;
  countUser: number = 0;
  countComp: number = 0;
  @Output() EndGameEvent = new EventEmitter<string>();

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  toggleModal(): void {
    this.isShow = !this.isShow;
    const count = this.dataService.countCurrent;
    this.countUser = count.countUser;
    this.countComp = count.countComp;
  }

  closeModal() {
    this.toggleModal();
    this.EndGameEvent.emit();
  }
}
