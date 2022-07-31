import FENParser from "./fen";

export default class ChessEngine {
	fenManager: FENParser
	constructor() {
		this.fenManager = new FENParser('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
	}
}
