import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-tabs',
  templateUrl: './confirm-tabs.page.html',
  styleUrls: ['./confirm-tabs.page.scss'],
})
export class ConfirmTabsPage implements OnInit {
 type:any
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHome(){
    console.log("go")
    this.router.navigateByUrl('/tabs/main');  
  }

}
