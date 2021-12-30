import {Move} from '../board/models';

export class MoveView {
  readonly source: number;
  readonly destination: number;
  constructor(move: Move) {
    this.source = move.source.index;
    this.destination = move.destination.index;
  }
}
