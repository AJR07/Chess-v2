import Bishop from './types/bishop';
import Piece from './types/empty';
import Knight from './types/knight';
import Pawn from './types/pawn';
import Queen from './types/queen';
import King from './types/king';

export type Pieces = Piece | Pawn | Knight | Bishop | Queen | King;
export type PieceType =
    | typeof Piece
    | typeof Pawn
    | typeof Knight
    | typeof Bishop
    | typeof Queen
    | typeof King;

export enum PieceShortNames {
    Piece = '',
    Pawn = 'p',
    Knight = 'n',
    Bishop = 'b',
    Queen = 'q',
    King = 'k',
}
