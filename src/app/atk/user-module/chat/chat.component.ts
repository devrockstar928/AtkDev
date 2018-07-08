import { ServerHttpService } from './../../services/server-http.service';
import { AuthenticationService } from './../../../auth/_services/authentication.service';
import { CONFIG } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../socket.io/chat.service';
import * as io from 'socket.io-client';
import { UserContacts } from '../../model/interface';
import { ToastrService } from 'ngx-toastr';

const url = CONFIG.baseUrls.base;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private socket;
  showvlaue = 'Contacts';
  contacts: UserContacts[] = [];
  myId;
  currentContact: UserContacts;
  currentMsgs = [];
  msg;
  constructor(private chat: ChatService,
    private httpSer: ServerHttpService,
    private toastr: ToastrService,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    this.getUserContacts();
    this.myId = this.authSer.currentUser.id;
    this.socket = io.connect(url);
    this.socket.emit('join', { u_id: this.myId });

    // this.socket.on('joined', (data) => {
    //   console.log('joined: ' + JSON.stringify(data));
    // });

    this.socket.on('private-message', (data) => {
      this.currentMsgs.push(data);
      console.log(data);
    });

    this.socket.on('read-messages', (data) => {
      this.currentMsgs.push(...data);
      console.log(data);
    });

  }

  sendMessage() {
    if (this.currentContact) {
      if (this.msg) {
        this.socket.emit('private-message',
          {
            receiver_id: this.currentContact.id
            , user: { u_name: this.currentContact.user_name }
            , text: this.msg
          });
        this.msg = ''
      } else {
        this.toastr.warning('Message is empty', 'Chat', { timeOut: 1000, positionClass: 'toast-bottom-full-width' })
      }
    } else {
      this.toastr.warning('Please Select Contact First', 'Chat', { timeOut: 1000, positionClass: 'toast-bottom-full-width' })
    }
  }

  getUserContacts() {
    this.httpSer.user_contacts().subscribe(res => {
      if (res['success']) {
        this.contacts = res['msg'];
      }
    });
  }

  selectContact(user) {
    this.currentContact = user;
    this.socket.emit('load-messages', { my_id: this.myId, other_id: user.id });
  }

}
