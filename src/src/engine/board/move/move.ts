import FENDetails from '../../fen/details';
import Coordinates from '../coordinates/coordinates';
import Colour from '../piece/colour';
import { Pieces } from '../piece/piecetype';
import MoveTypes from './movetypes';

export default class Move {
    private promotionTargetPiece: Pieces | null = null;
    currentFenDetails: FENDetails | null = null;
    endPieceColour: Colour | null;
    endPosition: Coordinates;
    moveType: MoveTypes;
    startPieceColour: Colour | null;
    startPosition: Coordinates;
    constructor(
        startCoords: Coordinates,
        startPieceColour: Colour | null,
        endPieceColour: Colour | null,
        moveType: MoveTypes = MoveTypes.BaseMove
    ) {
        this.startPosition = startCoords;
        this.endPosition = startCoords;
        this.startPieceColour = startPieceColour;
        this.endPieceColour = endPieceColour;
        this.moveType = moveType;
    }
    // TODO: More methods including notation, applying move etc to be implemented
}
