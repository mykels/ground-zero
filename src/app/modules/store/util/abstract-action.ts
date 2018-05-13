import {Action} from '@ngrx/store';

export abstract class AbstractAction<T> implements Action {
    readonly _payload: T;
    readonly _type: string;

    constructor(type: string, payload: T) {
        this._type = type;
        this._payload = payload;
    }

    get payload(): T {
        return this._payload;
    }

    get type(): string {
        return this._type;
    }
}
