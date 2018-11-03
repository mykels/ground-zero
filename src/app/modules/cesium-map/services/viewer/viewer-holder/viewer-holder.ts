import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from "rxjs/internal/operators";

@Injectable()
export class ViewerHolder {
  readonly viewer$: BehaviorSubject<any>;

  constructor() {
    this.viewer$ = new BehaviorSubject<any>(undefined);
  }

  init(viewer: any) {
    this.viewer$.next(viewer);
  }

  getViewer(): Observable<any> {
    return this.viewer$
    .pipe(filter((viewer: any) => !!viewer) );
  }
}
