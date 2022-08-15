import Move from '../../move/move';
import { Pieces } from '../piecetype';
import Piece from './empty';

export default class Bishop extends Piece {
    name = 'bishop';
    shortName = 'b';

    canBeMovedTo(move: Move, board: Pieces[][]) {
        let offset = this.calculateOffset(move);
        if (!this.basicLegalValidation(move)) return false;
        if (Math.abs(offset.first) == Math.abs(offset.second)) return true;
        return false;
    }
}
