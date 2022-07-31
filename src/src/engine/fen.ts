interface FENDetails{
	piecePlacement: (string | number)[][]
	activeColor: "w" | "b"
	castlingRights: "-" | ("Q" | "q" | "K" | "j")[]
	enPassantTarget: string | "-"
	halfMoveClock: number
	fullMoveClock: number
}

export default class FENParser {
	currentFen: string

	constructor(fen: string) {
		this.currentFen = fen;
	}

	parse(fen: string) {
		
	}
}