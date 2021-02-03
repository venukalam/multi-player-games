import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  inputValue: any = "";
  items: any;
  userNameSubmitted: boolean = false;
  constructor(private gameService: GameService) {

  }

  ngOnInit(): void {
    this.gameService.check().subscribe(res => this.items = res);
  }

  onSubmit() {
    this.gameService.push({ UserName: this.inputValue, Move: 1 }).then(() => {
      this.userNameSubmitted = true;
    });
  }

  onMove() {
    this.gameService.update({ UserName: this.inputValue, Move: this.items[0].payload.doc.data().Move + 1 }, this.items[0].payload.doc.id).then(() => {
      this.userNameSubmitted = true;
    });
  }
  onRefresh() {
    this.gameService.refresh(this.items).then(() => {
      this.userNameSubmitted = false;
    });
  }
}
