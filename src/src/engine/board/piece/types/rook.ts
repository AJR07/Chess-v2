import Move from '../../move/move';
import Piece from './empty';

export default class Rook extends Piece {
    name = 'rook';
    shortName = 'r';

    canBeMovedTo(move: Move) {
        return true;
    }
}
