import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserSessionService } from './../../../services/app-user-session.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerHttpService } from '../../../services/server-http.service';
import { User } from '../../../model/interface';

@Component({
  selector: 'app-edit-basic-info',
  templateUrl: './edit-basic-info.component.html',
  styleUrls: ['./edit-basic-info.component.css']
})
export class EditBasicInfoComponent implements OnInit {

  currentUser = <User>{};

  @Input() set UserCard(value) {
    if (value) {
      this.currentUser = value;
    }
  }
  constructor(private route: ActivatedRoute,
    private httpSer: ServerHttpService,
    private toastr: ToastrService,
    private router: Router,
    private userSession: UserSessionService) { }

  ngOnInit() {
    this.listenToUserId();
  }

  listenToUserId() {
    this.route.params.subscribe(parm => {
      this.currentUser = this.userSession.getSessionKey('editProfile');
      if (!this.currentUser) {
        this.httpSer.get_use_profile().subscribe(res => {
          if (res['result']) {
            this.currentUser = res['result'];
          }
          // if (res['xpObject']) {
          //   this.currentUser.p = res['xpObject'];
          // }

        });
      }
    });
  }


  editProfile() {
    this.currentUser.firstname = this.currentUser.first_name;
    this.currentUser.lastname = this.currentUser.last_name;
    this.currentUser.username = this.currentUser.user_name;
    this.currentUser.postalcode = this.currentUser.postal_code;
    this.currentUser.profile_description = this.currentUser.description;
    this.currentUser.userPhoto = this.currentUser.profile_picture;
    this.httpSer
      .edit_profile(this.currentUser)
      .subscribe(res => {
        if(res['success']=false){
          this.toastr.success('Edit Profile', res['msg']['detail']);
        }else if (res['msg'] == 1) {
          this.toastr.success('Edit Profile', 'Profile Data Saved Success');
          // this.router.navigate(['../../list'], { relativeTo: this.route });
        }
      });
  }

  fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      this.currentUser.userPhoto = event.target.files[0]['name'];
      const reader = new FileReader();
      reader.onload = (event2: any) => {
        this.currentUser.profile_picture = event2.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  backTolist() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
