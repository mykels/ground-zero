import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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
