import Move from '../../move/move';
import Piece from '../piece';

export default class Pawn extends Piece {
    name = 'pawn';

    canBeMovedTo(move: Move) {
        return true;
    }
}
