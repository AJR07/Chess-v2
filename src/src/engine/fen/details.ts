/*
Contains a class named FENDetails
Initialised by default with the details of the board in a chess starting position
Board details are stored slightly differently than that of the FEN notation, for ease of usage
*/

import CastlingEngine from '../board/castle/castling';
import Coordinates from '../board/coordinates/coordinates';
import Colour from '../board/piece/colour';
import { Pieces } from '../board/piece/piecetype';

export default class FENDetails {
    activeColour: Colour;
    castlingRights: CastlingEngine;
    enPassantTarget: Coordinates | null;
    fullMoveClock: number;
    halfMoveClock: number;
    piecePlacement: Pieces[][];
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
