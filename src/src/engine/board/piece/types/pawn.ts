import Move from '../../move/move';
import Colour from '../colour';
import Piece from './empty';
import { Pieces } from '../piecetype';

export default class Pawn extends Piece {
    name = 'pawn';
    shortName = 'p';

    checkIfSecondRank(move: Move) {
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

    checkOneSquareForward(move: Move) {
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

    checkForCapture(move: Move) {
        if (
            move.endPieceColour != Colour.none &&
            move.endPieceColour != this.colour
        ) {
            if (
                move.endPosition.coords!.first -
                    move.startPosition.coords!.first ==
                    1 &&
                Math.abs(
                    move.startPosition.coords!.second -
                        move.endPosition.coords!.second
                ) == 1 &&
                this.colour == Colour.white
            )
                return true;
            if (
                move.startPosition.coords!.first -
                    move.endPosition.coords!.first ==
                    1 &&
                Math.abs(
                    move.startPosition.coords!.second -
                        move.endPosition.coords!.second
                ) == 1 &&
                this.colour == Colour.black
            )
                return true;
            return false;
        }
        return false;
    }

    canBeMovedTo(move: Move, board: Pieces[][]) {
        if (!this.basicLegalValidation(move, board)) return false;
        if (this.checkOneSquareForward(move)) return true;
        if (this.checkIfSecondRank(move)) return true;
        if (this.checkForCapture(move)) return true;
        // TODO: implement en-passant
        return false;
    }
}
