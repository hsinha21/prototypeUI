import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public auth2: any;

  constructor(
    private router: Router,
    private coreService: CoreService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '395549559363-ui4rimbprtlcmodlqa911mqjaupv9970.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());

        if (profile) {
          console.log(profile);
          this.coreService.saveUserData(profile);
          // this.router.navigate(['/home']);
          this.ngZone.run(() => this.router.navigate(['/home'])).then();
        }
      }, (error) => {
        alert('Some Error Occured');
      });
  }

  signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
