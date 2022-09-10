import HasCastled from './hascastled';

/**
 * castling engine that manages whether each side has castled or not (part of the FEN engine)
 *
 * @export
 * @class CastlingEngine
 * @typedef {CastlingEngine}
 */
export default class CastlingEngine {
    blackCastle: HasCastled = new HasCastled(false, false);
    whiteCastle: HasCastled = new HasCastled(false, false);

    /**
     * Creates an instance of CastlingEngine.
     *
     * @constructor
     * @param {string} castleString
     */
    constructor(castleString: string) {
        this.processFENString(castleString);
    }

    /**
     * Utility function to check if black can castle
     *
     * @returns {*}
     */
    blackCanCastle() {
        return this.blackCastle.king && this.blackCastle.queen;
    }
    /**
     * Utility function to check if white can castle
     *
     * @returns {*}
     */
    whiteCanCastle() {
        return this.whiteCastle.king && this.whiteCastle.queen;
    }

    /**
     * exporting the details of whether white and black can castle into the format that the FEN string accepts
     *
     * @returns {string}
     */
    exportFENString() {
        let characters = 'KQkq';
        let exportedString = '';
        for (let char of characters) {
            if (char === 'Q')
                exportedString += this.whiteCastle.queen ? char : '';
            else if (char === 'q')
                exportedString += this.blackCastle.queen ? char : '';
            else if (char === 'K')
                exportedString += this.whiteCastle.king ? char : '';
            else if (char === 'k')
                exportedString += this.blackCastle.king ? char : '';
        }
        return exportedString;
    }

    /**
     * parsing the fen string into the details of whether white and black can castle
     *
     * @param {string} string
     */
    processFENString(string: string) {
        for (let char of string) {
            if (char === 'Q') this.whiteCastle.queen = true;
            else if (char === 'q') this.blackCastle.queen = true;
            else if (char === 'K') this.whiteCastle.king = true;
            else if (char === 'k') this.blackCastle.king = true;
        }
    }
}
