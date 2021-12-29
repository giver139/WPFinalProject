export enum Color {
  BLACK,
  RED,
};

export const enum Type {
  KING,
  GAURD,
  MINISTER,
  ROOK,
  KNIGHT,
  CANNON,
  PAWN,
};

export const enum ChessType {
  BLACK_KING,
  BLACK_GAURD,
  BLACK_MINISTER,
  BLACK_ROOK,
  BLACK_KNIGHT,
  BLACK_CANNON,
  BLACK_PAWN,
  RED_KING,
  RED_GAURD,
  RED_MINISTER,
  RED_ROOK,
  RED_KNIGHT,
  RED_CANNON,
  RED_PAWN,
  COVERED,
  EMPTY,
}

export interface Move {
  source: string;
  destination: string;
}

export class Chess {
  readonly color: Color;
  readonly type: Type;
  constructor(readonly chessType: ChessType) {

  }
  toChessType(): ChessType {
    return this.chessType;
  }
}

const ROW = 8;
const COLUMN = 4;

export class Board {
  board: Chess[];
  constructor(board?: number[]) {
    if(board === undefined) {
      this.board = new Array(32).map(() => new Chess(ChessType.EMPTY));
    }
    else {
      this.board = board.map((id: number) => new Chess(toChessType(id)));
    }
  }
  toChessTypeArray(): ChessType[] {
    return this.board.map((chess) => chess.toChessType());
  }
}
