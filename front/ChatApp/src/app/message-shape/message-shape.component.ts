import { NgIf } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message-shape',
  standalone: true,
  imports: [ NgIf ],
  templateUrl: './message-shape.component.html',
  styleUrl: './message-shape.component.css'
})
export class MessageShapeComponent implements OnInit{
  @Input() message: string = '';
  @Input() user: string = '';
  isCurrentUser: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    const currentUser = sessionStorage.getItem('currentUser');
    console.log(this.user, currentUser);
    this.isCurrentUser = this.user === currentUser;
  }
}
