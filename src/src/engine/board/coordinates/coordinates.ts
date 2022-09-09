import Pair from '../../../utils/pair';
import CoordType from './coordtype';

export default class Coordinates {
    coords: Pair<number, number> | null;

    constructor(coords: unknown, coordtype: CoordType) {
        if (coordtype == CoordType.pairCoordinates)
            this.coords = coords as Pair<number, number>;
        else if (coordtype == CoordType.algebraicCoordinates)
            this.coords = this.parseAlgebraic(coords as string);
        else this.coords = this.parseNumeric(`${coords as number}`);
    }

    private parseAlgebraic(coords: string): Pair<number, number> | null {
        return new Pair(
            7 - (coords.charCodeAt(0) - 'a'.charCodeAt(0)),
            parseInt(coords[1]) - 1
        );
    }

    private parseNumeric(coords: string): Pair<number, number> | null {
        return new Pair(coords.charCodeAt(0), coords.charCodeAt(1));
    }

    comparingWith(otherCoordinates: Pair<number, number>) {
        if (this.coords == null) return false;
        else return this.coords.equals(otherCoordinates);
    }

    convertAlgebraic(): string | null {
        if (!this.coords) return null;
        return `${String.fromCharCode(
            7 - this.coords.first + 'a'.charCodeAt(0)
        )}${this.coords.second + 1}`;
    }
}
