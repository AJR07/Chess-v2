import Move from '../../move/move';
import Piece from './empty';
import { Pieces } from '../piecetype';

export default class King extends Piece {
    name = 'king';
    shortName = 'k';

    canBeMovedTo(move: Move, board: Pieces[][]) {
        let offset = this.calculateOffset(move);
        if (!this.basicLegalValidation(move, board)) return false;
        if (Math.abs(offset.first) < 2 && Math.abs(offset.second) < 2)
            return true;
        return false;
    }
}
