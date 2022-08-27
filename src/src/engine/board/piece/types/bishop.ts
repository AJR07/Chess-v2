import Move from '../../move/move';
import Colour from '../colour';
import { Pieces } from '../piecetype';
import Piece from './empty';

export default class Bishop extends Piece {
    name = 'bishop';
    shortName = 'b';

    diagonalCheckJump(move: Move, board: Pieces[][]) {
        let iDirection =
                move.startPosition.coords!.first <
                move.endPosition.coords!.first
                    ? 1
                    : -1,
            jDirection =
                move.startPosition.coords!.second <
                move.endPosition.coords!.second
                    ? 1
                    : -1;
        for (
            let i = 1;
            i <
            Math.abs(
                move.startPosition.coords!.first -
                    move.endPosition.coords!.first
            );
            i++
        ) {
            if (
                board[move.startPosition.coords!.first + i * iDirection][
                    move.startPosition.coords!.second + i * jDirection
                ].colour != Colour.none
            ) {
                return false;
            }
        }
        return true;
    }

    canBeMovedTo(move: Move, board: Pieces[][]) {
        let offset = this.calculateOffset(move);
        if (!this.basicLegalValidation(move, board)) return false;
        if (
            Math.abs(offset.first) == Math.abs(offset.second) &&
            this.diagonalCheckJump(move, board)
        )
            return true;
        return false;
    }
}
