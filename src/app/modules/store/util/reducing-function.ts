import {Action} from '@ngrx/store';

export type ReducingFunction<T> = (state: T, action: Action) => T;
