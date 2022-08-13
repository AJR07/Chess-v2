import Coordinates from '../../coordinates/coordinates';
import Move from '../../move/move';
import Colour from '../color';

export default class Piece {
    shortName: string;
    name: string = '';
    colour: Colour;

    constructor(colour: Colour = Colour.none) {
        this.colour = colour;
        this.shortName = this.name.length > 0 ? this.name[0].toLowerCase() : '';
    }

    getLongName() {
        return `${this.colour}_${this.name}`;
    }

    canBeMovedTo(move: Move) {
        return false;
    }
}
