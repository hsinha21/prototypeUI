import { Component, NgZone, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public auth2: any;

  currentUser;
  allTeamEstimation: any;

  timedOut = false;
  lastPing?: Date = null;
  idleState = 'Not started.';

  contractResourceCost: number = 5000;
  travelAndExpence: number = 1000;
  margin: number = 25;

  constructor(
    private coreService: CoreService,
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
    private ngZone: NgZone
  ) {
    // For 15 mins idel time
    idle.setIdle(900);

    // Logging out user in 5 secs
    idle.setTimeout(5);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.timedOut = true;
      this.router.navigate(['/login']);
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
      });
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });

    keepalive.interval(15);
    keepalive.onPing.subscribe(() => this.lastPing = new Date());
    this.reset();
  }

  ngOnInit(): void {

    this.currentUser = this.coreService.getUserData();
    this.fetAllTeamEstimation();

  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  fetAllTeamEstimation() {
    this.coreService.getAllTeamEstimation().subscribe(
      (res: any) => {
        console.log(res);
        if (res.success) {
          this.allTeamEstimation = res.data;

          for (let i = 0; i < this.allTeamEstimation.length; i++) {
            let marginPercentage = (this.allTeamEstimation[i].resourceCostDesired + this.contractResourceCost + this.travelAndExpence) * (this.margin / 100);
            let proposalCostUSD = this.allTeamEstimation[i].resourceCostDesired + this.contractResourceCost + this.travelAndExpence + marginPercentage
            this.allTeamEstimation[i].proposalCostUSD = proposalCostUSD;

            let proposalCostAED = proposalCostUSD * res.AEDRate;
            this.allTeamEstimation[i].proposalCostAED = proposalCostAED;
          }

        }
      }
    );
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '395549559363-ui4rimbprtlcmodlqa911mqjaupv9970.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
    });
  }

  signout() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( () => {
      this.ngZone.run(() => this.router.navigate(['/login'])).then();

    });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
