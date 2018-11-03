import { Injectable } from '@angular/core';
import { Entity } from "../../../core/types/entity/entity";
import { Diff } from "../../../core/types/entity/diff";

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
  calculate(a: Map<string, Entity>, b: Map<string, Entity>): Diff<Entity> {
    const diff: Diff<any> = {removed: [], added: [], updated: []};

    if (!a) {
      diff.added = this.mapToArray(b);
      return diff;
    }

    a.forEach((entity: Entity) => {
      if (b.get(entity.id)) {
        diff.updated.push(entity);
        b.delete(entity.id);
      } else {
        diff.removed.push(entity);
      }
    });

    diff.added = [...this.mapToArray(b)];

    return diff;
  }

  private mapToArray<T>(map: Map<string, T>): T[] {
    const arr: T[] = [];

    map.forEach((value: T) => {
      arr.push(value);
    });

    return arr;
  }
}
