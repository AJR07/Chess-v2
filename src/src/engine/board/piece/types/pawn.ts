import Move from '../../move/move';
import Colour from '../colour';
import Piece from './empty';

export default class Pawn extends Piece {
    name = 'pawn';
    shortName = 'p';

    checkIfSecondRank(move: Move, colour: Colour) {
        // TODO: add en passant target
        if (
            move.startPosition.coords!.second ==
                move.endPosition.coords!.second &&
            move.startPosition.coords!.first == 1 &&
            move.endPosition.coords!.first == 3 &&
            colour == Colour.black
        )
            return true;
        if (
            move.startPosition.coords!.second ==
                move.endPosition.coords!.second &&
            move.startPosition.coords!.first == 6 &&
            move.endPosition.coords!.first == 4 &&
            colour == Colour.white
        )
            return true;
        return false;
    }

    checkOneSquareForward(move: Move, colour: Colour) {
        if (
            move.endPosition.coords!.first - move.startPosition.coords!.first ==
                1 &&
            move.startPosition.coords!.second ==
                move.endPosition.coords!.second &&
            colour == Colour.white
        )
            return true;
        if (
            move.startPosition.coords!.first - move.endPosition.coords!.first ==
                1 &&
            move.startPosition.coords!.second ==
                move.endPosition.coords!.second &&
            colour == Colour.black
        )
            return true;
        return false;
    }

    canBeMovedTo(move: Move) {
        if (this.checkIfSecondRank(move, this.colour)) return true;
        if (this.checkOneSquareForward(move, this.colour)) return true;
        // TODO: implement en-passant
        return false;
    }
}
