import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { HelperService } from '../../services/helper/helper.service';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {
  name:any
  description:any
  Info_ID:any
  constructor(private service:MainserviceService,private helper:HelperService,
              private location: Location,private activatedRoute: ActivatedRoute) { 
                this.Info_ID = this.activatedRoute.snapshot.paramMap.get('info_id');
              }

  ngOnInit() {

    this.helper.showSpinner()
      this.service.Get_information_details_by_ID(this.Info_ID).subscribe(
        (res:any)=>{
          if(res.success==1){
           this.name= res.data.title
           this.description=res.data.description
           this.htmlDecode(this.description)
          }
          this.helper.hideSpinner()
        },(err:any)=>{
          this.helper.hideSpinner()
        }
      )
  }

  goBack(){
    this.location.back();
  }

  htmlDecode(input){

    var e = document.createElement('div');
    e.innerHTML = input;
    this.description=e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue
  
  }


}
