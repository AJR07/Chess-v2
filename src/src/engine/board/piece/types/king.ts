import Move from '../../move/move';
import Piece from '../piece';

export default class King extends Piece {
    name = 'king';

    canBeMovedTo(move: Move) {
        return true;
    }
}
