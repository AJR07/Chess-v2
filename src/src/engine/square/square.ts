import Pair from '../../utils/pair';

export default class Square {
    private column: string;
    private row: number;
    private coordinates: Pair<number, number>;

    constructor(algebraicCoordinates: string) {
        // TODO: CHECK FOR INACCURATE ALGEBRAIC COORDINATES PASSED IN
        this.column = algebraicCoordinates[0];
        this.row = parseInt(algebraicCoordinates[1]);
        this.coordinates = new Pair(
            this.column.charCodeAt(0) - 'a'.charCodeAt(0) + 1,
            this.row
        );
    }
}
