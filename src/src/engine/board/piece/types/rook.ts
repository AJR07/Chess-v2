import Move from '../../move/move';
import Piece from './empty';
import { Pieces } from '../piecetype';

export default class Rook extends Piece {
    name = 'rook';
    shortName = 'r';

    canBeMovedTo(move: Move, board: Pieces[][]) {
        let offset = this.calculateOffset(move);
        if (!this.basicLegalValidation(move)) return false;
        if (offset.first == 0 || offset.second == 0) return true;
        return false;
    }
}
