import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { Location } from "@angular/common";
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
})
export class LanguagesPage implements OnInit {
  language:any
  languages:any[]
  selected=''
  constructor(private helper:HelperService, private langService:MainserviceService,
              private location: Location,private router: Router) { }

  ngOnInit() {
    this.langService. Getlanguages().subscribe(
      (res:any)=>{
          if(res.success==1){
             this.languages=res.data
          }

    },(err:any)=>{

    })

    this.selected=this.helper.selected
  }

  change_language(){
    console.log(this.language)
    this.helper.set_language(this.language)
    //this.router.navigateByUrl('/');
    //window.location.reload();
  }

  goBack(){
    this.location.back();
  }
}
