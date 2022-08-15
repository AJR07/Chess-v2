import Move from '../../move/move';
import Piece from './empty';

export default class Bishop extends Piece {
    name = 'bishop';
    shortName = 'b';

    canBeMovedTo(move: Move) {
        let offset = this.calculateOffset(move);
        if (Math.abs(offset.first) == Math.abs(offset.second)) return true;
        else return false;
    }
}
