import FENDetails from '../../fen/details';
import Coordinates from '../coordinates/coordinates';
import Colour from '../piece/colour';
import { Pieces } from '../piece/piecetype';
import MoveTypes from './movetypes';

export default class Move {
    startPosition: Coordinates;
    endPosition: Coordinates;
    startPieceColour: Colour | null;
    endPieceColour: Colour | null;
    moveType: MoveTypes;
    currentFenDetails: FENDetails | null = null;
    promotionTargetPiece: Pieces | null = null;

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
