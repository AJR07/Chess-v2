import CastlingEngine from '../board/castle/castling';
import Coordinates from '../board/coordinates/coordinates';
import CoordType from '../board/coordinates/coordtype';
import Colour from '../board/piece/colour';
import convertPiece from '../board/piece/piececonversion';
import { Pieces } from '../board/piece/piecetype';
import FENDetails from './details';

/**
 * Class that helps with managing and parsing the FEN String.
 * FEN Stands for Forsyth-Edwards Notation which is a common way to represent any board setup in Chess.
 * Find out more about FEN strings here: https://www.chessprogramming.org/Forsyth-Edwards_Notation
 * @date 9/10/2022 - 8:46:54 PM
 *
 * @export
 * @class FENParser
 * @typedef {FENParser}
 */
export default class FENParser {
    /**
     * Stores the current FEN for the board.
     *
     * @private
     * @type {string}
     */
    private currentFen: string;
    /**
     * Stores the history of the previous FEN Strings of the board.
     *
     * @private
     * @type {string[]}
     */
    private fenHistory: string[];
    /**
     * Listeners that subscribed to the FEN History and will be called whenever a new FEN-string is created for the board.
     *
     * @private
     * @type {((fenHistory: string[]) => void)[]}
     */
    private fenListeners: ((fenHistory: string[]) => void)[];
    /**
     * The current FEN String in its parsed format, for ease of use with classes from the codebase.
     *
     * @type {FENDetails}
     */
    data: FENDetails;

    /**
     * Creates an instance of FENParser.
     *
     * @constructor
     * @param {string} fen
     */
    constructor(fen: string) {
        this.currentFen = fen;
        this.fenHistory = [this.currentFen];
        this.fenListeners = [];
        this.data = this.parseFEN(fen);
    }

    /**
     * To be called when something wants to subscribe to the changes of fenHistory of the board.
     * The callback that was passed in will be called when the fenHistory is changed.
     *
     * @private
     * @param {(fenHistory: string[]) => void} fn
     * @returns {void) => void}
     */
    addListener(fn: (fenHistory: string[]) => void) {
        this.fenListeners.push(fn);
    }

    /**
     * From the details of a FEN String, build the FEN string.
     * Can be thought of as "exporting" the FEN String.
     *
     * @private
     * @param {FENDetails} FENDetails
     * @returns {*}
     */
    private buildFenString(FENDetails: FENDetails) {
        let fenString: string[] = [];

        // !parse piece placements
        let piecePlacements = '';
        for (let row of FENDetails.piecePlacement) {
            let curString = '',
                blankSpaces = 0;
            for (let piece of row) {
                if (piece.colour != Colour.none && blankSpaces != 0) {
                    curString += `${blankSpaces}`;
                    blankSpaces = 0;
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

        // !parse active colour
        fenString.push(FENDetails.activeColour === Colour.white ? 'w' : 'b');

        // !parse castling rights
        if (
            !FENDetails.castlingRights.whiteCanCastle() &&
            !FENDetails.castlingRights.blackCanCastle()
        ) {
            fenString.push('-');
        } else {
            fenString.push(FENDetails.castlingRights.exportFENString());
        }

        // !parse en-passant targets
        if (!FENDetails.enPassantTarget) {
            fenString.push('-');
        } else {
            fenString.push(FENDetails.enPassantTarget.convertAlgebraic()!);
        }

        // !parse half-move and full-move clock
        fenString.push(`${FENDetails.halfMoveClock}`);
        fenString.push(`${FENDetails.fullMoveClock}`);

        return fenString.join(' ');
    }

    /**
     * Parsing and extracting the details of a FEN String from the original Fen String.
     *
     * @private
     * @param {string} fen
     * @returns {FENDetails}
     */
    private parseFEN(fen: string) {
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
        data.activeColour =
            fenComponents[1] === 'w' ? Colour.white : Colour.black;

        // !parse castling rights
        let castlingRights = fenComponents[2];
        if (castlingRights != '-') {
            data.castlingRights.processFENString(fenComponents[2]);
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

    /**
     * Function that is called when the currentFEN is changed, and is to be added to the fen history.
     * Listeners that subscribed are called so they can process any of the changes.
     *
     * @private
     * @param {string} newFEN
     */
    private updateFenHistory(newFEN: string) {
        this.fenHistory.push(this.currentFen);
        for (let listener of this.fenListeners) {
            listener(this.fenHistory);
        }
    }

    /**
     * Called when the FEN string is to be regenerated from the new FEN Details provided.
     *
     * @param {FENDetails} fenDetails
     * @returns {string}
     */
    regenerateFen(fenDetails: FENDetails) {
        this.currentFen = this.buildFenString(fenDetails);
        this.data = fenDetails;
        this.updateFenHistory(this.currentFen);
        return this.currentFen;
    }
}
