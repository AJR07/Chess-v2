import Pair from '../../../../utils/pair';
import Move from '../../move/move';
import Colour from '../colour';
import Piece from './empty';

export default class Knight extends Piece {
    name = 'knight';
    shortName = 'n';
    static moveOffsets: Pair<number, number>[] = [];

    constructor(colour: Colour | undefined) {
        super(colour);
        if (Knight.moveOffsets.length == 0)
            Knight.moveOffsets = this.generateMoveOffsets();
    }

    generateMoveOffsets(): Pair<number, number>[] {
        let moveOffsets: Pair<number, number>[] = [];
        for (let i of [1, 2, -1, -2]) {
            for (let j of [1, 2, -1, -2]) {
                if (Math.abs(i) != Math.abs(j))
                    moveOffsets.push(new Pair(i, j));
            }
        }
        return moveOffsets;
    }

    canBeMovedTo(move: Move) {
        let offset = new Pair(
            move.startPosition.coords!.first - move.endPosition.coords!.first,
            move.startPosition.coords!.second - move.endPosition.coords!.second
        );
        for (let legalOffset of Knight.moveOffsets) {
            if (offset.equals(legalOffset)) return true;
        }
        return false;
    }
}
