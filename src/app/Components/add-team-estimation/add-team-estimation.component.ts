import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/core.service';

@Component({
  selector: 'app-add-team-estimation',
  templateUrl: './add-team-estimation.component.html',
  styleUrls: ['./add-team-estimation.component.scss']
})
export class AddTeamEstimationComponent implements OnInit {

  allDesignations: any;
  currentUser: any;

  teamEstimationForm = new FormGroup({
    designation: new FormControl("", [Validators.required]),
    resourceName: new FormControl("", [Validators.required]),
    rhpDesired: new FormControl("", [Validators.required]),
    rhpDiscounted: new FormControl("", [Validators.required]),
    totalHours: new FormControl("", [Validators.required]),
    reqPeriod: new FormControl("", [Validators.required]),
    avgHours: new FormControl("", [Validators.required]),
    resourceCostDesired: new FormControl("", [Validators.required]),
    resourceCostDiscounted: new FormControl("", [Validators.required]),
  });

  constructor(
    private coreService: CoreService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.currentUser = this.coreService.getUserData();
    console.log(this.currentUser);
    
    this.fetchAllDesignation();
  }

  fetchAllDesignation() {
    this.coreService.getAllDesignation().subscribe(
      (res: any) => {
        console.log(res);
        if (res.success) {
          this.allDesignations = res.data;
        }

      }
    );
  }

  onDesignationChange(desId) {
    for (let i = 0; i < this.allDesignations.length; i++) {
      if (this.allDesignations[i].designationId == desId) {
        this.teamEstimationForm.patchValue({ rhpDesired: this.allDesignations[i].rph })
      }
    }
  }

  onRphDiscounted(value) {
    // console.log(this.teamEstimationForm.controls['rhpDiscounted'].value);
    // console.log(this.teamEstimationForm.controls['totalHours'].value);

    let rhpDiscounted = this.teamEstimationForm.controls['rhpDiscounted'].value;
    let totalHours = this.teamEstimationForm.controls['totalHours'].value;

    if (rhpDiscounted !== "" && totalHours !== "") {
      let resourceCostDiscounted = rhpDiscounted * totalHours;
      this.teamEstimationForm.patchValue({ resourceCostDiscounted: resourceCostDiscounted })
    }
  }

  onTotalHours(value) {
    let rhpDiscounted = this.teamEstimationForm.controls['rhpDiscounted'].value;
    let totalHours = this.teamEstimationForm.controls['totalHours'].value;

    if (rhpDiscounted !== "" && totalHours !== "") {
      let resourceCostDiscounted = rhpDiscounted * totalHours;
      this.teamEstimationForm.patchValue({ resourceCostDiscounted: resourceCostDiscounted });
    }

    let rhpDesired = this.teamEstimationForm.controls['rhpDesired'].value;

    if (rhpDesired !== "" && totalHours !== "") {
      let resourceCostDesired = rhpDesired * totalHours;      
      this.teamEstimationForm.patchValue({ resourceCostDesired: resourceCostDesired });
    }

  }

  onReqPeriod(value) {
    let totalHours = this.teamEstimationForm.controls['totalHours'].value;
    let reqPeriod = this.teamEstimationForm.controls['reqPeriod'].value;

    if (reqPeriod !== "" && totalHours !== "") {
      let avgHours = totalHours / reqPeriod;
      this.teamEstimationForm.patchValue({ avgHours: avgHours });
    }
  }

  submit() {

    for(let i = 0; i < this.allDesignations.length; i++) {
      if(this.allDesignations[i].designationId == this.teamEstimationForm.value.designation) {
        this.teamEstimationForm.value.designation = this.allDesignations[i].designationName
      }
    }

    this.teamEstimationForm.value.creator = this.currentUser.Ad

    console.log(this.teamEstimationForm.value);

    this.coreService.saveCoreTeamEstimation(this.teamEstimationForm.value).subscribe(
      (res: any) => {
        console.log(res);
        if(res.success) {
          this.location.back();
        } else {
          console.log('Some Error Occured');
          
        }
      }
    );
  }

  cancel() {
    this.location.back();
  }

}
