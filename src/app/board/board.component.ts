import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  currentPlayer: string = "";
  winner: string = "";
  playerOne = "Player-1";
  playerTwo = "Player-2";
  boxes: any = [];
  move: boolean = true;
  @Input() newGame: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state)).subscribe((res) => {
        this.playerOne = res.P1;
        this.playerTwo = res.P2;
      })
    this.currentPlayer = this.playerOne;
    this.boxes = Array(9).fill(null);
  }

  startNewGame() {
    //nullify all variables
    this.currentPlayer = this.playerOne;
    this.winner = "";
    this.boxes = Array(9).fill(null);
  }

  markBox(index: number) {
    if (this.winner) return;
    if (this.boxes[index] != null) return;
    if (this.move) {
      this.boxes[index] = 'X'
    } else {
      this.boxes[index] = 'O'
    }
    this.winner = this.calculateWin(this.currentPlayer);
  }

  calculateWin(player: string) {
    const lines = [
      [0, 1, 2],
      [0, 3, 6],
      [1, 4, 7],
      [0, 4, 8],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.boxes[a] && this.boxes[a] === this.boxes[b] && this.boxes[a] === this.boxes[c]) {
        this.move = true;
        return player;
      }
    }
    this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
    this.move = !this.move;
    return '';
  }
}
