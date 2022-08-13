import Move from '../../move/move';
import Piece from './empty';

export default class Pawn extends Piece {
    name = 'pawn';

    canBeMovedTo(move: Move) {
        return true;
    }
}
