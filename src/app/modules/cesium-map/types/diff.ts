export interface Diff<T> {
  removed: T[];
  added: T[];
  updated: T[];
}
