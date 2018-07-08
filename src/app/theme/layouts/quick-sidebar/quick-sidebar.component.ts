import { Subject } from 'rxjs/Subject';
import { UserSessionService } from './../../../atk/services/app-user-session.service';
import { ServerHttpService } from './../../../atk/services/server-http.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Helpers } from '../../../helpers';
import { UserContacts, UserMessage, User_Session_Keys, Type_Of_Account } from '../../../atk/model/interface';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../auth/_services';
import * as io from 'socket.io-client';
import { CONFIG } from '../../../atk/services/config.service';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import * as $ from 'jquery';
import { UserSessionKeys } from '../../../atk/shared/user-session-keys';

const url = CONFIG.baseUrls.base;

@Component({
  selector: "app-quick-sidebar",
  templateUrl: "./quick-sidebar.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class QuickSidebarComponent implements OnInit, AfterViewInit {
  userPrivilegs = {};
  loading = false;
  isLogin = false;
  private socket;
  showvalue = 'Contacts';
  contacts: UserContacts[] = [];
  myId;
  myName;
  currentContact: UserContacts;
  currentMsgs: UserMessage[] = [];
  msg;
  private ngUnsubscribe = new Subject<false>(); // for unscubscribe any observer before destroy component
  constructor(
    private httpSer: ServerHttpService,
    private toastr: ToastrService,
    private _script: ScriptLoaderService,
    private userSession: UserSessionService,
    private authSer: AuthenticationService) { }

  ngOnInit() {

    this.setWhenInit();
    this.listenToLogin();
    this.getManagedUser$();
  }

  setWhenInit() {
    this.isLogin = this.authSer.isLogin();
    if (this.isLogin) {

      this.getUserContacts();
      this.myId = this.authSer.CurrentUser.id;
      this.myName = this.authSer.CurrentUser.user_name;
      this.socket = io.connect(url);
      this.socket.emit('join', { u_id: this.myId });

      // this.socket.on('joined', (data) => {
      //   console.log('joined: ' + JSON.stringify(data));
      // });

      this.socket.on('private-message', (data) => {
        data['type'] = 'in';
        this.currentMsgs.push(data);
      });

      this.socket.on('read-messages', (data) => {
        // console.log(data);
        this.loading = false;

        if (data['result'] && data['result'].length > 0) {
          const msgs = data['result'].map((ms: UserMessage) => {
            if (ms.receiver_id == this.myId) {
              ms['type'] = 'in';
            } else {
              ms['type'] = 'out';
            }
            return ms;
          });
          const c = [];
          c.push(...msgs);
          c.sort(function (a, b) { return (a.message_id > b.message_id) ? 1 : ((b.message_id > a.message_id) ? -1 : 0); });

          this.currentMsgs.unshift(...c);
          // this.currentMsgs.sort(function (a, b) { return (a.message_id > b.message_id) ? 1 : ((b.message_id > a.message_id) ? -1 : 0); });
          console.log(this.currentMsgs);
          setTimeout(() => {
            let height = 0;
            // $("#msgsg")[0].children.forEach(element => {

            // });
            $("#msgsg")[0].children[0].scrollTop = $("#msgsg")[0].children[0].scrollHeight + 66;
          }, 200);
        }
      });
      this.userPrivilegs = this.authSer.PrivilegeKeys;
    }
  }
  listenToLogin() {
    this.userSession
      .getSessionKey$(UserSessionKeys.CurrentUser)
      .subscribe(res => {
        if (res.name == UserSessionKeys.CurrentUser) {
          this.setWhenInit();
        }
      });

  }

  getManagedUser$() {
    this.userSession
      .getSessionKey$(User_Session_Keys.Managed_User)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.name == User_Session_Keys.Managed_User) {
          if (this.authSer.CurrentUserType == Type_Of_Account.CreatorManager) {
            this.userPrivilegs = this.authSer.PrivilegeKeys;
          }
          this.setWhenInit();
          // this.getUserContacts();
        }
      })
  }

  sort() {
    this.currentMsgs.sort(function (a, b) { return (a.message_id > b.message_id) ? 1 : ((b.message_id > a.message_id) ? -1 : 0); });
  }

  ngAfterViewInit() {
    this._script.load('.m-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default'
      , './assets/demo/default/emoji/js/config.js'
      , './assets/demo/default/emoji/js/util.js'
      , './assets/demo/default/emoji/js/jquery.emojiarea.js'
      , './assets/demo/default/emoji/js/emoji-picker.js'
    );

  }
  sendMessage() {
    // const val = $('#inputmsg').children('.emoji-wysiwyg-editor').text();
    // if (val && !this.msg) {
    // this.msg = val;
    // } 
    if (this.currentContact) {
      if (this.msg) {
        this.socket.emit('private-message',
          {
            receiver_id: this.currentContact.id
            , user: {
              u_name: this.myName
              , u_id: this.myId
            }
            , text: this.msg
          });
        this.currentMsgs.push({
          receiver_id: this.currentContact.id
          , user: {
            u_name: this.myName
            , u_id: this.myId
          }
          , text: this.msg
          , type: 'out'
        });
        this.msg = '';
        // $('#inputmsg').children('.emoji-wysiwyg-editor')[0].innerText = '';
      } else {
        this.toastr.warning('Message is empty', 'Chat', { timeOut: 1000, positionClass: 'toast-bottom-full-width' })
      }
    } else {
      this.toastr.warning('Please Select Contact First', 'Chat', { timeOut: 1000, positionClass: 'toast-bottom-full-width' })
    }
  }

  getUserContacts() {
    this.httpSer.user_contacts()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res['success']) {
          this.contacts = res['msg'];
          if (this.currentContact) {
            const emp = this.contacts.find(emp => emp.id == this.currentContact.id);
            if (emp) {
              this.currentContact = emp;
            }
          }
        }
      });
  }

  selectContact(user: UserContacts) {
    if (user.is_blocked) {
      this.toastr.warning('Sorry, you blocked this user', 'Blocked User', { positionClass: 'toast-top-full-width', timeOut: 5000 })
    } else if (user.is_blocking_me) {
      this.toastr.warning('Sorry, this user blocked you', 'Blocked User', { positionClass: 'toast-top-full-width', timeOut: 5000 })
    }
    this.currentContact = user;
    this.currentMsgs = [];
    this.socket.emit('load-messages', {
      my_id: this.myId
      , other_id: user.id
      , last_id: undefined
    });
    this.showvalue = 'Chat';
    // this.socket.emit('load-messages', { u_id: this.myId });

  }

  changeBlockUser(user: UserContacts) {
    this.httpSer
      .toggle_block_user(user.id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.success == true) {
          this.getUserContacts();
        }

      })
  }

  loadMore() {
    this.loading = true;
    this.socket.emit('load-messages', {
      my_id: this.myId
      , other_id: this.currentContact.id
      , last_id: this.currentMsgs.length > 0 ? this.currentMsgs[0].message_id : undefined
    });
  }

  onKey(event: any) { // without type info
    console.log(event)
    if (event.keyCode == 13) {
      setTimeout(() => {
        this.sendMessage();
      }, 1000);
      // document.getElementById('inputmsg').blur();
    }
    // this.values += event.target.value + ' | ';
  }

  onKeyDown(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
  }


  uiSearch(event) {
    return this.contacts.filter(it => it.user_name.match(event));
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}