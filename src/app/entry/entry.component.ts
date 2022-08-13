import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  player1 = "";
  player2 = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigateByUrl('/board', { state: { P1: this.player1, P2: this.player2 } })
  }
}
