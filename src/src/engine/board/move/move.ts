import FENDetails from '../../fen/details';
import Coordinates from '../coordinates/coordinates';
import Colour from '../piece/colour';
import { Pieces } from '../piece/piecetype';
import MoveTypes from './movetypes';

/**
 * Class that contains the detail of a move
 *
 * @export
 * @class Move
 * @typedef {Move}
 */
export default class Move {
    /**
     * Stores the potential promotion target piece (if it exists)
     *
     * @private
     * @type {(Pieces | null)}
     */
    private promotionTargetPiece: Pieces | null = null;
    /**
     * Stores the current FEN Details of the board
     *
     * @type {(FENDetails | null)}
     */
    currentFenDetails: FENDetails | null = null;
    endPieceColour: Colour | null;
    endPosition: Coordinates;
    moveType: MoveTypes;
    startPieceColour: Colour | null;
    startPosition: Coordinates;

    /**
     * Creates an instance of Move.
     *
     * @constructor
     * @param {Coordinates} startCoords
     * @param {(Colour | null)} startPieceColour
     * @param {(Colour | null)} endPieceColour
     * @param {MoveTypes} [moveType=MoveTypes.BaseMove]
     */
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
}
