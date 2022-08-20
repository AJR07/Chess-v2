/*
Contains a class named FENDetails
Initialised by default with the details of the board in a chess starting position
Board details are stored slightly differently than that of the FEN notation, for ease of usage
*/

import Coordinates from '../board/coordinates/coordinates';
import Colour from '../board/piece/colour';
import { Pieces } from '../board/piece/piecetype';

export default class FENDetails {
    piecePlacement: Pieces[][];
    activeColour: Colour;
    castlingRights: '-' | ('Q' | 'q' | 'K' | 'k')[];
    enPassantTarget: Coordinates | null;
    halfMoveClock: number;
    fullMoveClock: number;

    constructor(
        piecePlacement: Pieces[][],
        activeColour: Colour = Colour.white,
        castlingRights: '-' | ('Q' | 'q' | 'K' | 'k')[] = ['K', 'Q', 'k', 'q'],
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
