import Pair from '../../../../utils/pair';
import Move from '../../move/move';
import Colour from '../colour';
import Piece from './empty';
import { Pieces } from '../piecetype';
import generateKnightMoveOffsets from '../../../../utils/knight';

export default class Knight extends Piece {
    static moveOffsets: Pair<number, number>[] = [];
    name = 'knight';
    shortName = 'n';
    constructor(colour: Colour | undefined) {
        super(colour);
        if (Knight.moveOffsets.length == 0)
            Knight.moveOffsets = generateKnightMoveOffsets();
    }

    canBeMovedTo(move: Move, board: Pieces[][]) {
        let offset = this.calculateOffset(move);
        if (!this.basicLegalValidation(move, board)) return false;
        for (let legalOffset of Knight.moveOffsets) {
            if (offset.equals(legalOffset)) return true;
        }
        return false;
    }
}
