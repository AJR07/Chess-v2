import Move from '../../move/move';
import Piece from './empty';
import { Pieces } from '../piecetype';
import Pair from '../../../../utils/pair';
import Colour from '../colour';

/**
 * Represents the functionality of a rook. This is inherited from the base Piece.
 *
 * @export
 * @class Rook
 * @typedef {Rook}
 * @extends {Piece}
 */
export default class Rook extends Piece {
    name = 'rook';
    shortName = 'r';

    /**
     * Checking if a horizontal + vertical jump that is detailed by the move parameter is legal
     * It does this by checking if there is any piece in between the end square and the piece's start square.
     *
     * @private
     * @param {Move} move
     * @param {Pieces[][]} board
     * @returns {boolean}
     */
    private crossCheckJump(move: Move, board: Pieces[][]) {
        let iSorted = new Pair(
                move.startPosition.coords!.first <
                move.endPosition.coords!.first
                    ? move.startPosition.coords!.first
                    : move.endPosition.coords!.first,
                move.startPosition.coords!.first <
                move.endPosition.coords!.first
                    ? move.endPosition.coords!.first
                    : move.startPosition.coords!.first
            ),
            jSorted = new Pair(
                move.startPosition.coords!.second <
                move.endPosition.coords!.second
                    ? move.startPosition.coords!.second
                    : move.endPosition.coords!.second,
                move.startPosition.coords!.second <
                move.endPosition.coords!.second
                    ? move.endPosition.coords!.second
                    : move.startPosition.coords!.second
            );

        for (let i = iSorted.first + 1; i < iSorted.second; i++) {
            if (
                board[i][move.startPosition.coords!.second].colour !=
                Colour.none
            ) {
                return false;
            }
        }
        for (let j = jSorted.first + 1; j < jSorted.second; j++) {
            if (
                board[move.startPosition.coords!.first][j].colour != Colour.none
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
        if (!this.crossCheckJump(move, board)) return false;
        if (offset.first == 0 || offset.second == 0) return true;
        return false;
    }
}
