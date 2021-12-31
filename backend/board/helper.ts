import {isInteger} from '../utils';
import {InvalidSourceSelectionInCanMoveOneStepError} from './error';
import {Chess, ChessNo, Type, Position, toPosition} from '../board/models';

export function canMoveOneStep(source: Chess, destination: Chess): Boolean {
  if (source.chessNo === ChessNo.EMPTY || source.chessNo === ChessNo.COVERED) {
    throw new InvalidSourceSelectionInCanMoveOneStepError;
  }
  if (destination.chessNo === ChessNo.COVERED) {
    return false;
  }
  if (destination.chessNo === ChessNo.EMPTY) {
    return true;
  }
  if (source.color === destination.color) {
    return false;
  }
  if (source.type === Type.CANNON) {
    return false;
  }
  // deal pawn in special case
  if (source.type === Type.PAWN) {
    if (destination.type === Type.PAWN || destination.type === Type.KING) {
      return true;
    }
    else {
      return false;
    }
  }
  let typeOrder = [Type.KING, Type.GUARD, Type.MINISTER, Type.ROOK, Type.KNIGHT, Type.CANNON, Type.PAWN];
  if (typeOrder.indexOf(source.type) <= typeOrder.indexOf(destination.type)) {
    return true;
  }
  else {
    return false;
  }
}

const ROW = 8;
const COLUMN = 4;

export function getNeighborPositions(position: Position): Position[] {
  let dx = [0, 1, 0, -1];
  let dy = [1, 0, -1, 0];
  let neighbors = [];
  for (let i in dx) {
    let newX = position.row + dx[i];
    let newY = position.column + dy[i];
    if (newX < 0 || newY < 0 || newX >= ROW || newY >= COLUMN) {
      continue;
    }
    neighbors.push({index: newX * 4 + newY, row: newX, column: newY});
  }
  return neighbors;
}

