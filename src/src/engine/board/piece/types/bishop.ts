import Move from '../../move/move';
import Piece from './empty';

export default class Bishop extends Piece {
    name = 'bishop';
    shortName = 'b';

    canBeMovedTo(move: Move) {
        return true;
    }
}
