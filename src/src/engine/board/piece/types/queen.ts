import Move from '../../move/move';
import Piece from './empty';
import { Pieces } from '../piecetype';
import Pair from '../../../../utils/pair';
import Colour from '../colour';

export default class Queen extends Piece {
    name = 'queen';
    shortName = 'q';

    crossCheckJump(move: Move, board: Pieces[][]) {
        let iSorted = new Pair(
                move.startPosition.coords!.first <
                move.endPosition.coords!.first
                    ? move.startPosition.coords!.first
                    : move.endPosition.coords!.first,
                move.startPosition.coords!.first <
                move.endPosition.coords!.first
                    ? move.endPosition.coords!.first
                    : move.startPosition.coords!.first
            ),
            jSorted = new Pair(
                move.startPosition.coords!.second <
                move.endPosition.coords!.second
                    ? move.startPosition.coords!.second
                    : move.endPosition.coords!.second,
                move.startPosition.coords!.second <
                move.endPosition.coords!.second
                    ? move.endPosition.coords!.second
                    : move.startPosition.coords!.second
            );

        for (let i = iSorted.first + 1; i < iSorted.second; i++) {
            if (
                board[i][move.startPosition.coords!.second].colour !=
                Colour.none
            ) {
                return false;
            }
        }
        for (let j = jSorted.first + 1; j < jSorted.second; j++) {
            if (
                board[move.startPosition.coords!.first][j].colour != Colour.none
            ) {
                return false;
            }
        }
        return true;
    }

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
        if (!this.basicLegalValidation(move)) return false;
        if (
            (offset.first == 0 || offset.second == 0) &&
            this.crossCheckJump(move, board)
        )
            return true;
        if (
            Math.abs(offset.first) == Math.abs(offset.second) &&
            this.diagonalCheckJump(move, board)
        )
            return true;
        return false;
    }
}
