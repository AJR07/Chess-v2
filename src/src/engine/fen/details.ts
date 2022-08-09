/*
Contains a class named FENDetails
Initialised by default with the details of the board in a chess starting position
Board details are stored slightly differently than that of the FEN notation, for ease of usage
*/

import Square from '../board/square/square';

export default class FENDetails {
    piecePlacement: string[][] = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ];
    activeColour: 'w' | 'b' = 'w';
    castlingRights: '-' | ('Q' | 'q' | 'K' | 'k')[] = ['K', 'Q', 'k', 'q'];
    enPassantTarget: Square | '-' = '-';
    halfMoveClock: number = 0;
    fullMoveClock: number = 0;
}
