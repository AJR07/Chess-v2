import Square from '../square/square';
import FENDetails from './details';

export default class FENParser {
    currentFen: string;
    data: FENDetails;

    constructor(fen: string) {
        this.currentFen = fen;
        this.data = this.parse(fen);
    }

    parse(fen: string) {
        // TODO: ERROR HANDLING FOR INCORRECT STRINGS
        let fenComponents = fen.split(' '),
            data = new FENDetails();

        // !parse piece placements
        let piecePlacementBoard = fenComponents[0].split('/');
        data.piecePlacement = [];
        for (let row of piecePlacementBoard) {
            // loop over each row that is separated by '/'
            let currentRow = [];
            for (let pieceIdx = 0; pieceIdx < row.length; pieceIdx++) {
                // loop over every piece in the row
                let piece = row[pieceIdx];
                if (!isNaN(parseInt(piece))) {
                    // if the piece is an integer, that means that there is no piece there
                    // store as blank ('')
                    for (
                        let blankCount = 0;
                        blankCount < parseInt(piece);
                        blankCount++
                    )
                        currentRow.push('');
                } else {
                    // if not just add the piece to the current row
                    currentRow.push(piece);
                }
            }
            // add the current row to the board in data
            data.piecePlacement.push(currentRow);
        }

        // !parse active colour
        // active colour is just the character at the second index of fenComponents
        data.activeColour = fenComponents[1] as 'w' | 'b';

        // !parse castling rights
        let castlingRights = fenComponents[2];
        if (castlingRights == '-') {
            // neither side can castle
            data.castlingRights = '-';
        } else {
            data.castlingRights = [];
            for (
                let castlingRightsIdx = 0;
                castlingRightsIdx < castlingRights.length;
                castlingRightsIdx++
            ) {
                let castlingRight = castlingRights[castlingRightsIdx];
                if (
                    castlingRight == 'Q' ||
                    castlingRight == 'q' ||
                    castlingRight == 'K' ||
                    castlingRight == 'k'
                ) {
                    data.castlingRights.push(castlingRight);
                }
            }
        }

        // !parse en-passant targets
        let enPassantTarget = fenComponents[3];
        if (enPassantTarget == '-') {
            data.enPassantTarget = '-';
        } else {
            data.enPassantTarget = new Square(enPassantTarget);
        }

        // !parse half-move and full-move clock
        data.halfMoveClock = parseInt(fenComponents[4]);
        data.fullMoveClock = parseInt(fenComponents[5]);

        return data;
    }
}
