import Move from '../../move/move';
import Piece from './empty';

export default class Queen extends Piece {
    name = 'queen';

    canBeMovedTo(move: Move) {
        return true;
    }
}
