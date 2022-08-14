import Coordinates from '../../coordinates/coordinates';
import Move from '../../move/move';
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

    canBeMovedTo(move: Move) {
        return false;
    }
}
