import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ViewerHolder {
  readonly viewer$: Subject<any>;

  constructor() {
    this.viewer$ = new Subject<any>();
  }

  init(viewer: any) {
    this.viewer$.next(viewer);
  }

  getViewer(): Observable<any> {
    return this.viewer$;
  }
}
