import { join } from 'node:path';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent implements OnInit{
  joinRoomForm!: FormGroup;

  fb = inject(FormBuilder);
  chatService = inject(ChatService);
  router = inject(Router);

  ngOnInit(){
    this.joinRoomForm = this.fb.group({
      roomName: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  joinRoom(){
    this.chatService
      .joinRoom(this.joinRoomForm.value.roomName, this.joinRoomForm.value.userName)
      .then(() => {
        this.router.navigate(['/chat-app']);
      }).catch((err) => {
        console.log(err);
      });
  }
}
