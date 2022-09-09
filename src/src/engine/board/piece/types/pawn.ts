import Move from '../../move/move';
import Colour from '../colour';
import Piece from './empty';
import { Pieces } from '../piecetype';
import Coordinates from '../../coordinates/coordinates';
import Pair from '../../../../utils/pair';
import CoordType from '../../coordinates/coordtype';
import MoveTypes from '../../move/movetypes';

export default class Pawn extends Piece {
    name = 'pawn';
    shortName = 'p';

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
