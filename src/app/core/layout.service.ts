import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  url = environment.apiURL;

  private socket: Socket;

  chatSocket: WebSocket;
  messages$: Observable<any>;



  constructor(private http: HttpClient) {
    // this.chatSocket = new WebSocket('ws://192.168.1.179:8000/asynchronous/chat/admin/');
    // console.log(this.chatSocket, 'Socket Connected');
    // this.subscribeToMessages();
  }

  // subscribeToMessages() {
  //   this.chatSocket.onmessage = (event: MessageEvent) => {
  //     const message = event.data;
  //     // Process the message as needed
  //     console.log('Received message:', message);
  //   }
  // }

  getRoles():Observable<any> {
    return this.http.get(`${this.url}/api/account/roles/`)
  }
}
