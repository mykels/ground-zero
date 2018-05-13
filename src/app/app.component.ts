import {Component, OnInit} from '@angular/core';
import {EntityDistributor} from './modules/core/services/distribution/entity-distributor.service';

@Component({
  selector: 'gz-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private entityDistributor: EntityDistributor) {
    this.entityDistributor.init();
  }

  ngOnInit(): void {
  }
}
