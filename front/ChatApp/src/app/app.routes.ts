import { Routes } from '@angular/router';
import { JoinRoomComponent } from './join-room/join-room.component';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  {path: '', redirectTo: 'join-room', pathMatch: 'full'},
  {path: 'join-room', component: JoinRoomComponent},
  {path: 'chat-app', component: ChatAppComponent},
  {path: 'welcome', component: WelcomeComponent},

];
