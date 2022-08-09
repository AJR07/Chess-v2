import Coordinates from '../coordinates/coordinates';

export default class Move {
    startPosition: Coordinates;
    endPosition: Coordinates;

    constructor(startCoords: Coordinates) {
        this.startPosition = startCoords;
        this.endPosition = startCoords;
    }

    // TODO: More methods including notation, applying move etc to be implemented
}
