import Move from '../../move/move';
import Piece from './empty';
import { Pieces } from '../piecetype';

export default class Queen extends Piece {
    name = 'queen';
    shortName = 'q';

    canBeMovedTo(move: Move, board: Pieces[][]) {
        let offset = this.calculateOffset(move);
        if (!this.basicLegalValidation(move)) return false;
        if (offset.first == 0 || offset.second == 0) return true;
        if (Math.abs(offset.first) == Math.abs(offset.second)) return true;
        return false;
    }
}
