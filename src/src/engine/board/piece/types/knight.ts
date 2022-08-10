import Move from '../../move/move';
import Piece from '../piece';

export default class knight extends Piece {
    name = 'knight';
    shortName = 'n';

    canBeMovedTo(move: Move) {
        return true;
    }
}
