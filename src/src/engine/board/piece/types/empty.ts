import Pair from '../../../../utils/pair';
import Move from '../../move/move';
import { Pieces } from '../piecetype';
import Colour from '../colour';

export default class Piece {
    shortName: string = '';
    name: string = '';
    colour: Colour;

    constructor(colour: Colour = Colour.none) {
        this.colour = colour;
    }

    getLongName() {
        return `${this.colour}_${this.name}`;
    }

    calculateOffset(move: Move) {
        return new Pair(
            move.startPosition.coords!.first - move.endPosition.coords!.first,
            move.startPosition.coords!.second - move.endPosition.coords!.second
        );
    }

    basicLegalValidation(move: Move) {
        if (move.endPieceColour == this.colour) return false;
        return true;
    }

    canBeMovedTo(move: Move, board: Pieces[][]) {
        return false;
    }
}
