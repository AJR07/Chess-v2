import Move from '../../move/move';
import Colour from '../colour';
import Piece from './empty';
import { Pieces } from '../piecetype';
import Pair from '../../../../utils/pair';
import MoveTypes from '../../move/movetypes';

/**
 * Represents the functionality of a pawn. This is inherited from the base Piece.
 * @date 9/10/2022 - 9:29:24 PM
 *
 * @export
 * @class Pawn
 * @typedef {Pawn}
 * @extends {Piece}
 */
export default class Pawn extends Piece {
    name = 'pawn';
    shortName = 'p';

    /**
     * Checking if the move is legal (in the case where the pawn is capturing another piece).
     *
     * @private
     * @param {Move} move
     * @returns {boolean}
     */
    private checkForCapture(move: Move) {
        if (
            move.endPosition.coords!.first - move.startPosition.coords!.first ==
                1 &&
            Math.abs(
                move.startPosition.coords!.second -
                    move.endPosition.coords!.second
            ) == 1 &&
            this.colour == Colour.black &&
            move.endPieceColour === Colour.white
        )
            return true;
        if (
            move.startPosition.coords!.first - move.endPosition.coords!.first ==
                1 &&
            Math.abs(
                move.startPosition.coords!.second -
                    move.endPosition.coords!.second
            ) == 1 &&
            this.colour == Colour.white &&
            move.endPieceColour === Colour.black
        )
            return true;
        return false;
    }

    /**
     * Checks if the move is legal in the case of an en-passant. (Anarchy Chess!)
     * View more about it here: https://en.wikipedia.org/wiki/En_passant
     *
     * @private
     * @param {Move} move
     * @param {Pieces[][]} board
     * @returns {boolean}
     */
    private checkForEnPassant(move: Move, board: Pieces[][]) {
        if (
            move.endPosition.coords!.first - move.startPosition.coords!.first ==
                1 &&
            Math.abs(
                move.startPosition.coords!.second -
                    move.endPosition.coords!.second
            ) == 1 &&
            this.colour == Colour.black &&
            move.endPieceColour === Colour.none &&
            board[move.startPosition.coords!.first][
                move.endPosition.coords!.second
            ].colour === Colour.white &&
            move.currentFenDetails!.enPassantTarget !== null &&
            new Pair(
                move.startPosition.coords!.first,
                move.endPosition.coords!.second
            ).equals(move.currentFenDetails!.enPassantTarget!.coords!)
        )
            return true;
        if (
            move.startPosition.coords!.first - move.endPosition.coords!.first ==
                1 &&
            Math.abs(
                move.startPosition.coords!.second -
                    move.endPosition.coords!.second
            ) == 1 &&
            this.colour == Colour.white &&
            move.endPieceColour === Colour.none &&
            board[move.startPosition.coords!.first][
                move.endPosition.coords!.second
            ].colour === Colour.black &&
            move.currentFenDetails!.enPassantTarget !== null &&
            new Pair(
                move.startPosition.coords!.first,
                move.endPosition.coords!.second
            ).equals(move.currentFenDetails!.enPassantTarget!.coords!)
        )
            return true;
        return false;
    }

    /**
     * Checks if the pawn hasn't moved (if it is on the "2nd-rank" from their point of view)
     * If it hasn't moved, allow it to move 2 squares forward.
     * For white that would be at rank 6, and black rank 2
     *
     * @private
     * @param {Move} move
     * @returns {boolean}
     */
    private checkIfSecondRank(move: Move) {
        // TODO: add en passant target
        if (
            move.startPosition.coords!.second ==
                move.endPosition.coords!.second &&
            move.startPosition.coords!.first == 1 &&
            move.endPosition.coords!.first == 3 &&
            this.colour == Colour.black
        )
            return true;
        if (
            move.startPosition.coords!.second ==
                move.endPosition.coords!.second &&
            move.startPosition.coords!.first == 6 &&
            move.endPosition.coords!.first == 4 &&
            this.colour == Colour.white
        )
            return true;
        return false;
    }

    /**
     * Check if the pawn can move one square forward.
     *
     * @private
     * @param {Move} move
     * @returns {boolean}
     */
    private checkOneSquareForward(move: Move) {
        if (
            move.endPosition.coords!.first - move.startPosition.coords!.first ==
                1 &&
            move.startPosition.coords!.second ==
                move.endPosition.coords!.second &&
            this.colour == Colour.black &&
            move.endPieceColour != Colour.white
        )
            return true;
        if (
            move.startPosition.coords!.first - move.endPosition.coords!.first ==
                1 &&
            move.startPosition.coords!.second ==
                move.endPosition.coords!.second &&
            this.colour == Colour.white &&
            move.endPieceColour != Colour.black
        )
            return true;
        return false;
    }

    /**
     * Checking if the current piece can have the move executed on it, given the board as a parameter.
     *
     * @param {Move} move
     * @param {Pieces[][]} board
     * @returns {boolean}
     */
    canBeMovedTo(move: Move, board: Pieces[][]) {
        if (!this.basicLegalValidation(move, board)) return false;
        if (this.checkOneSquareForward(move)) return true;
        if (this.checkIfSecondRank(move)) return true;
        if (this.checkForCapture(move)) return true;
        if (this.checkForEnPassant(move, board)) {
            // change move type for move engine to detect
            move.moveType = MoveTypes.EnPassantMove;
            return true;
        }
        return false;
    }
}
