import Coordinates from '../coordinates/coordinates';
import Move from '../move/move';
import Colour from './color';

export default class Piece {
    coords: Coordinates;
    shortName: string;
    name: string = '';
    colour: Colour;

    constructor(coords: Coordinates, colour: Colour = Colour.none) {
        this.coords = coords;
        this.colour = colour;
        this.shortName = this.name[0].toLowerCase();
    }

    getLongName() {
        return `${this.colour}_${this.name}`;
    }

    canBeMovedTo(move: Move) {
        return false;
    }
}
