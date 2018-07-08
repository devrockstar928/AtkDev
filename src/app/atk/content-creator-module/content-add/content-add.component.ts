import { TiersHttpService } from './../tiers/tiers-http.service';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from './../../../helpers';
import { AuthenticationService } from './../../../auth/_services/authentication.service';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { Post, PostContent, ContentCreator, Type_Of_Account } from './../../model/interface';
import { ServerHttpService } from './../../services/server-http.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['./content-add.component.css']
})
export class ContentAddComponent implements OnInit {
  // postForm: FormGroup;
  // public uploader: FileUploader = new FileUploader({
  //   url: url
  //   , authToken: auth
  // });

  @ViewChild('imageFile') imageFile;
  @ViewChild('videoFile') videoFile;
  @ViewChild('postThumbFile') postThumbFile;

  postContent: PostContent = {};
  selectPhoto;
  selectPostThumb;
  selectVideoThumb;
  postThumb;
  videoThumb;
  selectVideo;
  formData;
  video_link;
  text_subject;
  image_subject;
  video_subject;
  contentType = 1;
  selectedContentCreator = [];
  contentCreator;
  textPostValue = '';
  imagedescription = '';
  videodescription = '';
  filtered = [];
  userType;
  filteredCountriesMultiple: ContentCreator[] = [];

  tiresValues = [];
  filesToUpload: Array<File> = [];

  constructor(private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private _http: HttpClient,
    private toastr: ToastrService,
    private authSer: AuthenticationService,
    private tierSer: TiersHttpService,
    private mainSer: ServerHttpService,
    private _script: ScriptLoaderService) { }

  ngOnInit() {
    this.userType = this.authSer.CurrentUserType;
    this.getContentTiers();
    if (this.authSer.CurrentUserType == Type_Of_Account.Admin) {
      this.getContentCreator();
    }

    this.loadScript();
  }
  uploadFile(item: FileItem) {
    item.alias = 'userPhoto';
    item.upload();
  }
  getContentTiers() {
    this.tierSer.getUserTiers().subscribe(res => {
      this.tiresValues = res['msg'];
    });
  }

  getContentCreator() {
    this.mainSer.getUserslist(Type_Of_Account.CreatorContent).subscribe(res => {
      if (res['type'] == 'Success') {
        if (res['data'] && res['data'].length > 0) {
          res['data'].map(ele => ele['fullname'] = `${ele.first_name} ${ele.last_name}`)
        }
        this.filteredCountriesMultiple = res['data'];
      }
    });
  }

  tabChange(event) {
    this.postContent.creators = undefined;
    this.postContent.uploadedFrom = undefined;
    this.postContent.userPhoto = undefined;
    this.postThumb = undefined;
    this.videoThumb = undefined;
    this.imageFile.nativeElement.value = '';
    this.videoFile.nativeElement.value = '';
    this.selectPhoto = '';
    this.selectPostThumb = '';
    this.selectVideoThumb = '';
    this.selectVideo = '';
    this.textPostValue = '';
    this.contentType = event.index + 1;
    this.video_link = '';
    this.text_subject = '';
    this.image_subject = '';
    this.video_subject = '';
  }
  //#region file change
  fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      this.postContent.userPhoto = event.target.files[0]['name'];
      const reader = new FileReader();
      reader.onload = (event2: any) => {
        this.selectPhoto = event2.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  postThumbChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      this.postThumb = event.target.files[0]['name'];
      const reader = new FileReader();
      reader.onload = (event2: any) => {
        this.selectPostThumb = event2.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  videoThumbChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      this.videoThumb = event.target.files[0]['name'];
      const reader = new FileReader();
      reader.onload = (event2: any) => {
        this.selectVideoThumb = event2.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // video
  videoChangeEvent(event, video) {
    if (event.target.files && event.target.files[0]) {
      this.selectVideo = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(event.target.files[0]));
      video.load();
    }
  }

  loadScript() {
    this._script.load('body', 'assets/vendors/froala_editor/js/froala_editor.pkgd.min.js'
      , 'assets/vendors/froala_editor/js/froala_editor.min.js')
      .then(result => {
        Helpers.setLoading(false);
        // optional js to be loaded once
        // this._script.load('head', 'assets/vendors/custom/fullcalendar/fullcalendar.bundle.js');
      });

  }

  save(postForm) {
    if (!this.postContent.tierid) {
      this.toastr.error('Please Select Tier', 'Tier Error', { positionClass: 'toast-bottom-full-width', timeOut: 2000 });
      return;
    }
    // const post = <PostContent>{};
    // post.tierid = this.postContent.tierid;

    let formData = new FormData(); // Currently empty
    const myForm = <HTMLFormElement>document.getElementById('formid');
    formData = new FormData(myForm);
    formData.append('uploadedfrom', 'Web App');
    formData.append('forsale', 'false');
    formData.append('tierid', String(this.postContent.tierid));

    if (this.contentType == 1) {
      formData.append('postType', 'status');
      this.textPostValue = this.video_link ? '<video>' + this.video_link + '</video>' + this.textPostValue : this.textPostValue;
      formData.append('description', this.textPostValue);
      formData.append('subject', this.text_subject);
      formData.append('postImage', this.selectPostThumb);
      // post.description = this.postContent.description;
      // post data type - status 
    } else if (this.contentType == 2) {
      formData.append('postType', 'image');
      formData.append('description', this.imagedescription);
      formData.append('subject', this.image_subject);
      formData.append('postImage', this.selectPhoto);
    } else if (this.contentType == 3) {
      formData.append('postType', 'video');
      formData.append('description', this.videodescription);
      formData.append('subject', this.video_subject);
      formData.append('postImage', this.selectVideoThumb);
      formData.append('postVideo', this.selectVideoThumb);
    }


    /* **************************************** */
    Helpers.setLoading(true);
    this.mainSer.add_Post_formdata(formData).then(res => {
      if (res.status == 200) {
        this.reset();
        this.toastr.success('content added successfully', 'Add Content');
      }
      Helpers.setLoading(false);
    })
  }

  // getFetch(data) {
  //   const headers = new Headers({
  //     'Authorization': `JWT ${JSON.parse(sessionStorage.getItem('token'))}`,
  //   });
  //   let options = {};
  //   options['headers'] = headers;
  //   options['method'] = 'POST';
  //   options['body'] = data;
  //   const request = new Request('http://atkserver.mtcdevsite.com:5000/ContentCreator/add_post', options);
  //   return fetch(request)
  // }

  reset() {
    this.postContent = {};
    this.imageFile.nativeElement.value = '';
    this.videoFile.nativeElement.value = '';
    this.selectPhoto = '';
    this.selectPostThumb = '';
    this.selectVideoThumb = '';
    this.selectVideo = '';
    this.textPostValue = '';
    this.imagedescription = '';
    this.videodescription = '';
    this.video_link = '';
    this.text_subject = '';
    this.image_subject = '';
    this.video_subject = '';
  }


  //#region filet content creator

  filterCountryMultiple(event) {
    const query = event.query;
    // this.countryService.getCountries().then(countries => {
    this.filtered = this.filterCountry(query, this.filteredCountriesMultiple);
    // });
  }

  filterCountry(query, countries: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      // if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      if (country.fullname.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }
  //#endregion
}

