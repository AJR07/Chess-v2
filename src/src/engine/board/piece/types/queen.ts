import Move from '../../move/move';
import Piece from './empty';

export default class Queen extends Piece {
    name = 'queen';
    shortName = 'q';

    canBeMovedTo(move: Move) {
        return true;
    }
}
