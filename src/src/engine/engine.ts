import FENParser from './fen/parser';

/**
 * Intended to store core functionality of an engine such as chess-AI, notation but did not have time to add it yet.
 * Contains the FEN parser as of now.
 *
 * @export
 * @class ChessEngine
 * @typedef {ChessEngine}
 */
export default class ChessEngine {
    /**
     * Storing the engine's FEN manager
     * @type {FENParser}
     */
    fenManager: FENParser;
    /**
     * Instantiating the FENparser with the default FEN string for a chessboard
     * 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
     * @constructor
     */
    constructor() {
        this.fenManager = new FENParser(
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        );
    }

    /**
     * Presenting an easy way for the UI to get the bot data without having to access the fenManager
     * @returns {*}
     */
    getBoardData() {
        return this.fenManager.data.piecePlacement;
    }
}
