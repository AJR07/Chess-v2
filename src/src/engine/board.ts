import ChessEngine from './chess';

export default class ChessBoard {
    chessEngine: ChessEngine;
    constructor() {
        this.chessEngine = new ChessEngine();
    }
}
