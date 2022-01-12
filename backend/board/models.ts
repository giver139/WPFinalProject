import {isInteger} from '../utils';
import {InvalidPositionError, InvalidChessNoError} from './error';

export enum Color {
  BLACK,
  RED,
};

export enum Type {
  KING,
  GUARD,
  MINISTER,
  ROOK,
  KNIGHT,
  CANNON,
  PAWN,
};

export enum ChessNo {
  BLACK_KING,
  BLACK_GUARD,
  BLACK_MINISTER,
  BLACK_ROOK,
  BLACK_KNIGHT,
  BLACK_CANNON,
  BLACK_PAWN,
  RED_KING,
  RED_GUARD,
  RED_MINISTER,
  RED_ROOK,
  RED_KNIGHT,
  RED_CANNON,
  RED_PAWN,
  COVERED,
  EMPTY,
}

export interface ChessType {
  color: Color;
  type: Type;
  chessNo: ChessNo;
}

function toChessType(chessNo: number): ChessType {
  switch(chessNo) {
    case ChessNo.BLACK_KING:
      return {color: Color.BLACK, type: Type.KING, chessNo: ChessNo.BLACK_KING};
    case ChessNo.BLACK_GUARD:
      return {color: Color.BLACK, type: Type.GUARD, chessNo: ChessNo.BLACK_GUARD};
    case ChessNo.BLACK_MINISTER:
      return {color: Color.BLACK, type: Type.MINISTER, chessNo: ChessNo.BLACK_MINISTER};
    case ChessNo.BLACK_ROOK:
      return {color: Color.BLACK, type: Type.ROOK, chessNo: ChessNo.BLACK_ROOK};
    case ChessNo.BLACK_KNIGHT:
      return {color: Color.BLACK, type: Type.KNIGHT, chessNo: ChessNo.BLACK_KNIGHT};
    case ChessNo.BLACK_CANNON:
      return {color: Color.BLACK, type: Type.CANNON, chessNo: ChessNo.BLACK_CANNON};
    case ChessNo.BLACK_PAWN:
      return {color: Color.BLACK, type: Type.PAWN, chessNo: ChessNo.BLACK_PAWN};
    case ChessNo.RED_KING:
      return {color: Color.RED, type: Type.KING, chessNo: ChessNo.RED_KING};
    case ChessNo.RED_GUARD:
      return {color: Color.RED, type: Type.GUARD, chessNo: ChessNo.RED_GUARD};
    case ChessNo.RED_MINISTER:
      return {color: Color.RED, type: Type.MINISTER, chessNo: ChessNo.RED_MINISTER};
    case ChessNo.RED_ROOK:
      return {color: Color.RED, type: Type.ROOK, chessNo: ChessNo.RED_ROOK};
    case ChessNo.RED_KNIGHT:
      return {color: Color.RED, type: Type.KNIGHT, chessNo: ChessNo.RED_KNIGHT};
    case ChessNo.RED_CANNON:
      return {color: Color.RED, type: Type.CANNON, chessNo: ChessNo.RED_CANNON};
    case ChessNo.RED_PAWN:
      return {color: Color.RED, type: Type.PAWN, chessNo: ChessNo.RED_PAWN};
    default:
      throw new InvalidChessNoError;
  }
}

export interface Position {
  index: number;
  row: number;
  column: number;
}

export function toPosition(index: number): Position {
  if(!isInteger(index) || index < 0 || index > 31) {
    throw new InvalidPositionError;
  }
  return {index, row: index >> 2, column: index & 3};
}

export interface Move {
  source: Position;
  destination: Position;
}

export function toMove(source: number, destination: number): Move {
  return {source: toPosition(source), destination: toPosition(destination)};
}

export class Chess {
  chessType: ChessType;
  position: Position;
  constructor(chessType: ChessType, position: Position) {
    this.chessType = chessType;
    this.position = position;
  }
  get color(): Color {
    return this.chessType.color;
  }
  get type(): Type {
    return this.chessType.type;
  }
  get chessNo(): ChessNo {
    return this.chessType.chessNo;
  }
}

const ROW = 8;
const COLUMN = 4;

export class Board {
  board: Chess[];
  constructor(board?: number[]) {
    if(board === undefined) {
      this.board = new Array(32).map((value: unknown, index: number) => new Chess(toChessType(ChessNo.EMPTY), toPosition(index)));
    }
    else {
      this.board = board.map((id: number, index: number) => new Chess(toChessType(id), toPosition(index)));
    }
  }
  toChessNoArray(): ChessNo[] {
    return this.board.map((chess) => chess.chessNo);
  }
}
