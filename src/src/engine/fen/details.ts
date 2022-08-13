/*
Contains a class named FENDetails
Initialised by default with the details of the board in a chess starting position
Board details are stored slightly differently than that of the FEN notation, for ease of usage
*/

import Coordinates from '../board/coordinates/coordinates';
import PieceType from '../board/piece/piecetype';
import Square from '../board/square';

export default class FENDetails {
    piecePlacement: PieceType[][];
    activeColour: 'w' | 'b' = 'w';
    castlingRights: '-' | ('Q' | 'q' | 'K' | 'k')[] = ['K', 'Q', 'k', 'q'];
    enPassantTarget: Coordinates | null = null;
    halfMoveClock: number = 0;
    fullMoveClock: number = 0;

    constructor(piecePlacement: PieceType[][]) {
        this.piecePlacement = piecePlacement;
    }
}
