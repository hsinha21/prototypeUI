import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  // url = 'http://localhost:3001/apis'

  // For Ec2
  url = "http://ec2-65-0-11-129.ap-south-1.compute.amazonaws.com:3001/apis"

  // currentUser;

  currentUser: any = {
    $t: "bksinha213@gmail.com",
    Ad: "Harshit Sinha",
    NT: "107352175650657431173",
    TJ: "https://lh6.googleusercontent.com/-JUdFkUdo8kE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclUqXkRtBvYehuWwyWc_iKwytHm4w/s96-c/photo.jpg",
    tV: "Harshit",
    uT: "Sinha"
  };

  constructor(
    private http: HttpClient
  ) { }

  saveUserData(data) {
    this.currentUser = data;
  }

  getUserData() {
    return this.currentUser;
  }

  getAllDesignation() {
    return this.http.get(this.url + '/getAllDesignation');
  }

  saveCoreTeamEstimation(data) {
    return this.http.post(this.url + '/saveCoreTeamEstimation', data);
  }

  getAllTeamEstimation() {
    return this.http.get(this.url + '/getAllTeamEstimation');
  }
}
