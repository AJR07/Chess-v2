import Move from '../../move/move';
import Piece from './empty';

export default class Queen extends Piece {
    name = 'queen';
    shortName = 'q';

    canBeMovedTo(move: Move) {
        let offset = this.calculateOffset(move);
        if (offset.first == 0 || offset.second == 0) return true;
        if (Math.abs(offset.first) == Math.abs(offset.second)) return true;
        else return false;
    }
}
