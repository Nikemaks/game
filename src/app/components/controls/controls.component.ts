import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  countData = this.dataService.countCurrent;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  startGame(value: string) {
    this.newItemEvent.emit(value);
  }

  updateCounter(): void {
    this.countData = this.dataService.countCurrent;
  }

}
