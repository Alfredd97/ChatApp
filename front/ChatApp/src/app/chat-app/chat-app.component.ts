import { Component, Input, OnInit, inject } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-app',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './chat-app.component.html',
  styleUrl: './chat-app.component.css'
})
export class ChatAppComponent implements OnInit{
  chatService = inject(ChatService);

  @Input() message: string = '';
  users: string[] = [];

  messages: any[] = [];

  ngOnInit() : void{
    this.chatService.messages$.subscribe(msg => {
      this.messages = msg;
      console.log(this.messages);
    })

    this.chatService.users$.subscribe(users => {
      this.users = users;
    });
  }

  async sendMessage(){
    this.chatService.sendMessage(this.message)
    .then(() => {
      this.message = '';
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
