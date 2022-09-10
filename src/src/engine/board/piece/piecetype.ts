import Bishop from './types/bishop';
import Piece from './types/empty';
import Knight from './types/knight';
import Pawn from './types/pawn';
import Queen from './types/queen';
import King from './types/king';

/**
 * A generic type that represents every piece.
 *
 * @export
 * @typedef {Pieces}
 */
export type Pieces = Piece | Pawn | Knight | Bishop | Queen | King;
/**
 * A generic type that represents the type of every piece.
 *
 * @export
 * @typedef {PieceType}
 */
export type PieceType =
    | typeof Piece
    | typeof Pawn
    | typeof Knight
    | typeof Bishop
    | typeof Queen
    | typeof King;

/**
 * An enum that stores the short names for each piece.
 *
 * @export
 * @enum {number}
 */
export enum PieceShortNames {
    Piece = '',
    Pawn = 'p',
    Knight = 'n',
    Bishop = 'b',
    Rook = 'r',
    Queen = 'q',
    King = 'k',
}
