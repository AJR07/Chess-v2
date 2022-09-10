import Pair from '../../../utils/pair';
import CoordType from './coordtype';

/**
 * Utility class to manage coordinates.
 *
 * @export
 * @class Coordinates
 * @typedef {Coordinates}
 */
export default class Coordinates {
    coords: Pair<number, number> | null;

    /**
     * Creates an instance of Coordinates.
     *
     * @constructor
     * @param {unknown} coords
     * @param {CoordType} coordtype
     */
    constructor(coords: unknown, coordtype: CoordType) {
        if (coordtype == CoordType.pairCoordinates)
            this.coords = coords as Pair<number, number>;
        else if (coordtype == CoordType.algebraicCoordinates)
            this.coords = this.parseAlgebraic(coords as string);
        else this.coords = this.parseNumeric(`${coords as number}`);
    }

    /**
     * Parsing the coordinates from an algebraic coordinate into a numeric one.
     * An example of an algebraic coordinate is "a4", "e5", "c6" (like the normal chess square coordinates)
     *
     * @private
     * @param {string} coords
     * @returns {(Pair<number, number> | null)}
     */
    private parseAlgebraic(coords: string): Pair<number, number> | null {
        return new Pair(
            7 - (coords.charCodeAt(0) - 'a'.charCodeAt(0)),
            parseInt(coords[1]) - 1
        );
    }

    /**
     * Parsing the coordinates from an numeric (string) coordinate into a numeric (number) one.
     *
     * @private
     * @param {string} coords
     * @returns {(Pair<number, number> | null)}
     */
    private parseNumeric(coords: string): Pair<number, number> | null {
        return new Pair(coords.charCodeAt(0), coords.charCodeAt(1));
    }

    /**
     * Utility function to compare a coordinate with another
     *
     * @param {Pair<number, number>} otherCoordinates
     * @returns {boolean}
     */
    comparingWith(otherCoordinates: Pair<number, number>) {
        if (this.coords == null) return false;
        else return this.coords.equals(otherCoordinates);
    }

    /**
     * Utility function to convert the coordinate to algebraic coordinates
     *
     * @returns {(string | null)}
     */
    convertAlgebraic(): string | null {
        if (!this.coords) return null;
        return `${String.fromCharCode(
            7 - this.coords.first + 'a'.charCodeAt(0)
        )}${this.coords.second + 1}`;
    }
}
