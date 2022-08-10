import Move from '../../move/move';
import Piece from '../piece';

export default class Rook extends Piece {
    name = 'rook';

    canBeMovedTo(move: Move) {
        return true;
    }
}
