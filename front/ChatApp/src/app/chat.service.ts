import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public connection = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:5100/chatHub')
  .configureLogging(signalR.LogLevel.Information)
  .build();

  public messages$ = new BehaviorSubject<any>([]);
  public users$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.start();
    this.connection.on("ReceiveMessage", (userName: string, message: string, dateTime: Date) => {
        this.messages = [...this.messages, { userName, message, dateTime }];
        this.messages$.next(this.messages);
    });

    this.connection.on('ReceiveConnectedUser', (users: string[]) => {
      this.users$.next(users);
    });
  }

  // start connection
  public async start(){
    try{
      await this.connection.start();
    }catch(err){
      console.log(err);
    }
  }

  // send message
  public async sendMessage(message: string){
    return this.connection.invoke("SendMessage", message);
  }


  // join room
  public async joinRoom(room: string, userName: string){
    return this.connection.invoke("JoinRoom", { userName, room });
  }

  // leave room
  public async leaveRoom(){
    return this.connection.stop();
  }
}
