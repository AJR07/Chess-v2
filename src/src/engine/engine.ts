import FENParser from './fen/parser';

export default class ChessEngine {
    fenManager: FENParser;
    board: string[][];

    constructor() {
        this.fenManager = new FENParser(
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        );
        this.board = this.getBoardData();
    }

    getBoardData() {
        return this.fenManager.data.piecePlacement;
    }
}
