import Move from '../../move/move';
import Piece from './empty';
import { Pieces } from '../piecetype';

/**
 * Represents the functionality of a king. This is inherited from the base Piece.
 *
 * @export
 * @class King
 * @typedef {King}
 * @extends {Piece}
 */
export default class King extends Piece {
    name = 'king';
    shortName = 'k';

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
        if (Math.abs(offset.first) < 2 && Math.abs(offset.second) < 2)
            return true;
        return false;
    }
}
