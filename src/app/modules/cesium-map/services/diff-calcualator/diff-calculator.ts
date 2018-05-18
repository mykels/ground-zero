import {Injectable} from '@angular/core';
import {Diff} from '../../types/diff';
import {Map} from 'immutable';

/*****************
 * a = [1,2,3,4]
 * b = [2,3,4,5]
 * diff(a,b)= {
 *  removed: [1],
 *  added: [5],
 *  updated: [2,3,4]
 * }
 ****************/
@Injectable()
export class DiffCalculator {
  calculate(a: Map<string, any>, b: Map<string, any>): Diff<any> {
    const diff: Diff<any> = {removed: [], added: [], updated: []};

    if (!a) {
      diff.added = b.toArray();
      return diff;
    }

    a.forEach(element => {
      if (b.get(element.id)) {
        diff.updated.push(element);
        b.remove(element);
      } else {
        diff.removed.push(element);
      }
    });

    diff.added = [...b.toArray()];

    return diff;
  }
}
