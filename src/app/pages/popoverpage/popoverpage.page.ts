import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-popoverpage',
  templateUrl: './popoverpage.page.html',
  styleUrls: ['./popoverpage.page.scss'],
})
export class PopoverpagePage implements OnInit {
 name:any
 description:any
 info_id:any
  constructor(public service:MainserviceService,public helper:HelperService,
              private navparams:NavParams,public popover:PopoverController) { }

  ngOnInit() {
       this.helper.showSpinner()
      this.service.Get_information_details_by_ID(this.navparams.get('info_id')).subscribe(
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

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    this.description=e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue
  }

   closepopover(){
     this.popover.dismiss()
   }
}

