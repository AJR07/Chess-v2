import Move from '../../move/move';
import Piece from './empty';

export default class King extends Piece {
    name = 'king';
    shortName = 'k';

    canBeMovedTo(move: Move) {
        return true;
    }
}
