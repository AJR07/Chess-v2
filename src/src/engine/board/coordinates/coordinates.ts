import Pair from '../../../utils/pair';
import CoordType from './coordtype';

export default class Coordinates {
    coords: Pair<number, number> | null;
    constructor(coords: string, coordtype: CoordType) {
        if (coordtype == CoordType.algebraicCoordinates)
            this.coords = this.parseAlgebraic(coords);
        else this.coords = this.parseAlgebraic(coords);
    }

    parseAlgebraic(coords: string): Pair<number, number> | null {
        return new Pair(
            coords.charCodeAt(0) - 'a'.charCodeAt(0) + 1,
            coords.charCodeAt(1)
        );
    }

    parseNumeric(coords: string): Pair<number, number> | null {
        return new Pair(coords.charCodeAt(0), coords.charCodeAt(1));
    }
}
