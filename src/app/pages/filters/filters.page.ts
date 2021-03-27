import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  filterBy:any
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async setFilter(){
    await this.popoverController.dismiss(this.filterBy);
  }


}
