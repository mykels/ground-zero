import {Injectable} from '@angular/core';
import {Diff} from '../../types/diff';
import {Map} from 'immutable';

@Injectable()
export class DiffCalculator {
  calculate(current: Map<string, any>, previous: Map<string, any>): Diff<any> {
    current.forEach(element => {
      if (previous.get(element.id)) {
        //TODO: finish
      }
    });

    return {
      removed: [],
      added: [],
      updated: []
    }
  }
}
