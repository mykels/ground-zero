import {ReducingFunction} from './reducing-function';
import {Action} from '@ngrx/store';

export abstract class AbstractReducer<T> {
    private actorMap: Map<string, ReducingFunction<T>>;

    constructor() {
        this.actorMap = new Map<string, ReducingFunction<T>>();
    }

    reduce(state: T, action: Action): T {
        const actor = this.actorMap.get(action.type);
        return actor ? actor(state, action) : state;
    }

    protected register(type: string, actor: ReducingFunction<T>): AbstractReducer<T> {
        this.actorMap.set(type, actor);
        return this;
    }
}
