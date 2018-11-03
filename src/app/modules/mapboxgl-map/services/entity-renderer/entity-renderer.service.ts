import { Injectable } from "@angular/core";
import { Entity } from "../../../core/types/entity/entity";
import { Diff } from "../../../core/types/entity/diff";

@Injectable()
export class EntityRenderer {
  constructor() {

  }

  render(diff: Diff<Entity>, map: any) {
    console.log(diff);
  }
}
