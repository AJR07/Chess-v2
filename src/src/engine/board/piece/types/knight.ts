import Move from '../../move/move';
import Piece from './empty';

export default class Knight extends Piece {
    name = 'knight';
    shortName = 'n';

    canBeMovedTo(move: Move) {
        return true;
    }
}
