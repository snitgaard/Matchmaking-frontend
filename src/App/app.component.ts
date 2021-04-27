import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PopupComponent} from './MatchMaking/popup/popup.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matchmaking-frontend';

  constructor(public dialog: MatDialog) {}

  openDiaLog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });


  }
}
