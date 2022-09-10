/*
Contains a class named FENDetails
Initialised by default with the details of the board in a chess starting position
Board details are stored slightly differently than that of the FEN notation, for ease of usage
*/

import CastlingEngine from '../board/castle/castling';
import Coordinates from '../board/coordinates/coordinates';
import Colour from '../board/piece/colour';
import { Pieces } from '../board/piece/piecetype';

/**
 * Details of a FEN String when parsed, represented with the proper classes that are used in this codebase.
 *
 * @export
 * @class FENDetails
 * @typedef {FENDetails}
 */
export default class FENDetails {
    activeColour: Colour;
    castlingRights: CastlingEngine;
    enPassantTarget: Coordinates | null;
    fullMoveClock: number;
    halfMoveClock: number;
    piecePlacement: Pieces[][];
    /**
     * Creates an instance of FENDetails.
     *
     * @constructor
     * @param {Pieces[][]} piecePlacement
     * @param {Colour} [activeColour=Colour.white]
     * @param {CastlingEngine} [castlingRights=new CastlingEngine('KQkq')]
     * @param {(Coordinates | null)} [enPassantTarget=null]
     * @param {number} [halfMoveClock=0]
     * @param {number} [fullMoveClock=0]
     */
    constructor(
        piecePlacement: Pieces[][],
        activeColour: Colour = Colour.white,
        castlingRights: CastlingEngine = new CastlingEngine('KQkq'),
        enPassantTarget: Coordinates | null = null,
        halfMoveClock: number = 0,
        fullMoveClock: number = 0
    ) {
        this.piecePlacement = piecePlacement;
        this.activeColour = activeColour;
        this.castlingRights = castlingRights;
        this.enPassantTarget = enPassantTarget;
        this.halfMoveClock = halfMoveClock;
        this.fullMoveClock = fullMoveClock;
    }
}
