import {Move} from '../board/models';

export class MoveView {
  readonly source: string;
  readonly destination: string;
  constructor(move: Move) {
    this.source = move.source;
    this.destination = move.destination;
  }
}
