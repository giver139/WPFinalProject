import {InvalidSourceSelectionError, NoPossibleDestinationError} from './error';
import {Color, Move, Position, Board, Type, ChessNo, toMove} from '../board/models';
import {Game} from '../models/game';
import {canMoveOneStep, getNeighborPositions} from '../board/helper';

const ROW = 8;
const COLUMN = 4;

export function getValidDestinations(game: Readonly<Game>, color: Color, source: Position): Move[] {
  const board = new Board(game.board);
  if (board.board[source.index].chessNo === ChessNo.EMPTY) {
    throw new InvalidSourceSelectionError;
  }
  if (board.board[source.index].chessNo === ChessNo.COVERED) {
    return [{source: source, destination: source}];
  }
  if (board.board[source.index].color !== color) {
    throw new InvalidSourceSelectionError;
  }
  let validMoves = [];
  let neighbors = getNeighborPositions(source);
  for (let neighborPosition of neighbors) {
    if (canMoveOneStep(board.board[source.index], board.board[neighborPosition.index])) {
      validMoves.push(toMove(source.index, neighborPosition.index));
    }
  }
  if (board.board[source.index].type === Type.CANNON) {
    let dx = [1, 0, -1, 0];
    let dy = [0, 1, 0, -1];
    for (let i in dx) {
      let hasOneChess = false;
      for (let j = 1; j < 8; j++) {
        let newX = source.row + dx[i] * j;
        let newY = source.column + dy[i] * j;
        if (newX < 0 || newX >= ROW || newY < 0 || newY >= COLUMN) {
          break;
        }
        let newIndex = newX * 4 + newY;
        if (board.board[newIndex].chessNo !== ChessNo.EMPTY) {
          if (hasOneChess === false) {
            hasOneChess = true;
          }
          else {
            if (board.board[newIndex].chessNo !== ChessNo.COVERED && board.board[newIndex].color !== board.board[source.index].color) {
              validMoves.push(toMove(source.index, newIndex));
            }
            break;
          }
        }
      }
    }
  }
  if (validMoves.length === 0) {
    throw new NoPossibleDestinationError;
  }
  return validMoves;
}
