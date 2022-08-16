import Coordinates from '../board/coordinates/coordinates';
import CoordType from '../board/coordinates/coordtype';
import Colour from '../board/piece/colour';
import convertPiece from '../board/piece/piececonversion';
import { Pieces } from '../board/piece/piecetype';
import FENDetails from './details';

export default class FENParser {
    currentFen: string;
    data: FENDetails;

    constructor(fen: string) {
        this.currentFen = fen;
        this.data = this.parseFEN(fen);
        console.log(this.buildFenString(this.data));
    }

    parseFEN(fen: string) {
        // TODO: ERROR HANDLING FOR INCORRECT STRINGS
        let fenComponents = fen.split(' ');

        // !parse piece placements
        let piecePlacementBoard = fenComponents[0].split('/'),
            piecePlacement: Pieces[][] = [];
        for (let row of piecePlacementBoard) {
            // loop over each row that is separated by '/'
            let currentRow: Pieces[] = [];
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
                        currentRow.push(convertPiece('', Colour.none));
                } else {
                    // if not just add the piece to the current row
                    currentRow.push(
                        convertPiece(
                            piece.toLowerCase(),
                            piece.toUpperCase() == piece
                                ? Colour.white
                                : Colour.black
                        )
                    );
                }
            }
            // add the current row to the board in data
            piecePlacement.push(currentRow);
        }

        let data = new FENDetails(piecePlacement);

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
            data.enPassantTarget = null;
        } else {
            data.enPassantTarget = new Coordinates(
                enPassantTarget,
                CoordType.algebraicCoordinates
            );
        }

        // !parse half-move and full-move clock
        data.halfMoveClock = parseInt(fenComponents[4]);
        data.fullMoveClock = parseInt(fenComponents[5]);

        return data;
    }

    buildFenString(FENDetails: FENDetails) {
        let fenString: string[] = [];

        // parse piece placements
        let piecePlacements = '';
        for (let row of FENDetails.piecePlacement) {
            let curString = '',
                blankSpaces = 0;
            for (let piece of row) {
                if (piece.colour != Colour.none && blankSpaces != 0) {
                    curString += `${blankSpaces}`;
                }
                if (piece.colour == Colour.none) {
                    blankSpaces++;
                }
                curString +=
                    piece.colour == Colour.white
                        ? piece.shortName.toUpperCase()
                        : piece.shortName.toLowerCase();
            }
            if (blankSpaces != 0) {
                curString += `${blankSpaces}`;
            }
            piecePlacements += `${curString}/`;
        }
        fenString.push(piecePlacements.slice(0, -1));

        // parse
        return fenString.join(' ');
    }
}
