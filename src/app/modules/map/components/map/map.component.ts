import {Component, OnInit} from '@angular/core';
import {AcNotification, ActionType} from 'angular-cesium';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'gz-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private numOfEntities = 2;
  private intervalMs = 200;
  private tracks$: Subject<AcNotification> = new Subject();

  ngOnInit(): void {
    setInterval(() => {
      let simData = this.createSimData();
      simData.forEach(notification => {
        this.tracks$.next(notification);
      })

    }, 1000);

    this.tracks$.subscribe((notification) => {
      console.log(notification);
    });
  }

  createSimData(): Array<any> {
    const data = [];
    for (let i = 0; i < this.numOfEntities; i++) {
      const position = {
        lat: 34,
        long: 32,
        altitude: 5000
      };

      const heading = Math.random() * 2 * Math.PI;
      const futurePosition = this.getFuturePosition(position, heading);
      data.push({
        id: i,
        actionType: ActionType.ADD_UPDATE,
        entity: {
          id: i,
          isTarget: i % 2 === 0,
          callsign: 'track' + i,
          image: '/assets/images/fighter-jet.png',
          alt: position.altitude,
          heading,
          position: Cesium.Cartesian3.fromDegrees(position.lat, position.long, position.altitude),
          futurePosition
        }
      });
    }

    return data;
  }

  getTextColor(): any {
    return Cesium.Color.BLACK;
  }

  private maxMovementDistance() {
    return 0.08 * this.intervalMs / 1000;
  }

  private getFuturePosition(position: any, heading: number) {
    return {
      lat: position.lat + (Math.random() / 5),
      long: position.long + (Math.random() / 5),
      altitude: position.altitude + (Math.random()*100 + 1000)
    };
  }

}
