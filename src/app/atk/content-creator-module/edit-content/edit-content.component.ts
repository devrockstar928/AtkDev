import { TiersHttpService } from './../tiers/tiers-http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSessionService } from './../../services/app-user-session.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../auth/_services/authentication.service';
import { Content, PostContent } from './../../model/interface';
import { ServerHttpService } from './../../services/server-http.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {

  postContent: PostContent = {};
  selectPhoto;
  selectVideo;
  selectedContentCreator = [];
  contentCreator;
  textPostValue = '';
  filtered = [];
  userType;
  filteredCountriesMultiple: any[] = [
    { id: 147, name: 'Corrado	Caretto' }
    , { id: 151, name: 'Kevin	Pereira' }
    , { id: 146, name: 'Jeremy	Hache' }
    , { id: 150, name: 'Michael	Hurn' }
    , { id: 33, name: 'lolo	koko' }
    , { id: 163, name: 'Sara	Underwood' }
    , { id: 154, name: 'Yaniv	Fituci' }
    , { id: 83, name: 'mohamed	ragab' }];

  currentContent: Content = {};
  tiresValues = [];

  constructor(private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private userSession: UserSessionService,
    private toastr: ToastrService,
    private tierSer:TiersHttpService,
    private authSer: AuthenticationService,
    private mainSer: ServerHttpService) { }

  ngOnInit() {
    this.userType = this.authSer.CurrentUserType;
    this.getContentTiers();
    this.route.params.subscribe(param => {
      if (+param['id']) {
        this.currentContent = this.userSession.getSessionKey('content_post');
        if (this.currentContent) {
          this.postContent.postid = this.currentContent.id;
          this.postContent.tierid = this.currentContent.tier_id;
          this.postContent.description = this.currentContent.description;
          this.postContent['uploadedfrom'] = this.currentContent['uploadedFrom'];
          this.postContent.forsale = this.currentContent.for_sale;
          this.postContent.post_data_type = this.currentContent.post_data_type
          this.setUiData();
        }
      };

    });
  }

  setUiData() {
    this.setFileReaderUrl();
  }
  getContentTiers() {
    this.tierSer.getUserTiers().subscribe(res => {
      this.tiresValues = res['msg'];
    });
  }

  setFileReaderUrl() {
    if (this.currentContent.post_data_type == 'image') {
      this.selectPhoto = this.sanitizer.bypassSecurityTrustUrl(this.currentContent.images);
    } else if (this.currentContent.post_data_type == 'video') {
      this.selectVideo = this.sanitizer.bypassSecurityTrustUrl(this.currentContent.video_url);

    }
  }


  save(postForm) {
    if (!this.postContent.tierid) {
      this.toastr.error('Please Select Tier', 'Tier Error', { positionClass: 'toast-bottom-full-width', timeOut: 2000 });
      return;
    }
    // {
    //   "uploadedfrom":"web1",
    //   "description":"kljkkljkl",
    //   "tierid":18,
    //   "postid":360,
    //   "forsale":false
    // }
    /* **************************************** */
    this.mainSer.edit_Post({
      postid: this.postContent.postid,
      tierid: this.postContent.tierid,
      description: this.postContent.description,
      uploadedfrom: this.postContent.uploadedFrom,
      forsale: this.postContent.forsale
    } as PostContent).subscribe(res => {
      if (res['msg'] == 1) {
        this.toastr.success(res['text'], 'Update Content');
      }else{
        this.toastr.error(res['text'], 'Error');
      }
    })
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
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }
  //#endregion
}

