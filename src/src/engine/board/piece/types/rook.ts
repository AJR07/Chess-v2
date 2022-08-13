import Move from '../../move/move';
import Piece from './empty';

export default class Rook extends Piece {
    name = 'rook';

    canBeMovedTo(move: Move) {
        return true;
    }
}
