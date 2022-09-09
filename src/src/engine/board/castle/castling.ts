import HasCastled from './hasCastled';

export default class CastlingEngine {
    blackCastle: HasCastled = new HasCastled(false, false);
    whiteCastle: HasCastled = new HasCastled(false, false);
    constructor(castleString: string) {
        this.processFENString(castleString);
    }

    blackCanCastle() {
        return this.blackCastle.king && this.blackCastle.queen;
    }

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

    processFENString(string: string) {
        for (let char of string) {
            if (char === 'Q') this.whiteCastle.queen = true;
            else if (char === 'q') this.blackCastle.queen = true;
            else if (char === 'K') this.whiteCastle.king = true;
            else if (char === 'k') this.blackCastle.king = true;
        }
    }

    whiteCanCastle() {
        return this.whiteCastle.king && this.whiteCastle.queen;
    }
}
