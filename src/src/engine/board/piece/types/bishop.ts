import Move from '../../move/move';
import Colour from '../colour';
import { Pieces } from '../piecetype';
import Piece from './empty';

/**
 * Represents the functionality of a bishop. This is inherited from the base Piece.
 *
 * @export
 * @class Bishop
 * @typedef {Bishop}
 * @extends {Piece}
 */
export default class Bishop extends Piece {
    name = 'bishop';
    shortName = 'b';

    /**
     * Checking if a diagonal jump that is detailed by the move parameter is legal
     * It does this by checking if there is any piece in between the end square and the piece's start square.
     *
     * @private
     * @param {Move} move
     * @param {Pieces[][]} board
     * @returns {boolean}
     */
    private diagonalCheckJump(move: Move, board: Pieces[][]) {
        let iDirection =
                move.startPosition.coords!.first <
                move.endPosition.coords!.first
                    ? 1
                    : -1,
            jDirection =
                move.startPosition.coords!.second <
                move.endPosition.coords!.second
                    ? 1
                    : -1;
        for (
            let i = 1;
            i <
            Math.abs(
                move.startPosition.coords!.first -
                    move.endPosition.coords!.first
            );
            i++
        ) {
            if (
                board[move.startPosition.coords!.first + i * iDirection][
                    move.startPosition.coords!.second + i * jDirection
                ].colour != Colour.none
            ) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checking if the current piece can have the move executed on it, given the board as a parameter.
     *
     * @param {Move} move
     * @param {Pieces[][]} board
     * @returns {boolean}
     */
    canBeMovedTo(move: Move, board: Pieces[][]) {
        let offset = this.calculateOffset(move);
        if (!this.basicLegalValidation(move, board)) return false;
        if (
            Math.abs(offset.first) == Math.abs(offset.second) &&
            this.diagonalCheckJump(move, board)
        )
            return true;
        return false;
    }
}
