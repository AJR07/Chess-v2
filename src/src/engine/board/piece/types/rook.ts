import Move from '../../move/move';
import Piece from './empty';

export default class Rook extends Piece {
    name = 'rook';
    shortName = 'r';

    canBeMovedTo(move: Move) {
        let offset = this.calculateOffset(move);
        if (offset.first == 0 || offset.second == 0) return true;
        else return false;
    }
}
