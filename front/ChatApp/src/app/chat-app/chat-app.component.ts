import { MessageShapeComponent } from './../message-shape/message-shape.component';
import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-app',
  standalone: true,
  imports: [ FormsModule, CommonModule, MessageShapeComponent ],
  templateUrl: './chat-app.component.html',
  styleUrl: './chat-app.component.css'
})
export class ChatAppComponent implements OnInit{
  chatService = inject(ChatService);

  @Input() message: string = '';
  users: string[] = [];

  messages: any[] = [];

  @HostListener('scroll', ['$event'])
  onScroll(event: any){
    console.log(event);
  }

  ngOnInit() : void{
    this.chatService.messages$.subscribe(msg => {
      this.messages = msg;
      console.log(this.messages);
    })

    this.chatService.users$.subscribe(users => {
      this.users = users;
      console.log(this.users);
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
