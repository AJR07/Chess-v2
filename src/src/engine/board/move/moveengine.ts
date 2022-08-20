import { PanInfo } from 'framer-motion';
import Pair from '../../../utils/pair';
import ChessEngine from '../../engine';
import FENDetails from '../../fen/details';
import Coordinates from '../coordinates/coordinates';
import CoordType from '../coordinates/coordtype';
import Colour from '../piece/colour';
import { Pieces, PieceShortNames } from '../piece/piecetype';
import Piece from '../piece/types/empty';
import Move from './move';
import MoveTypes from './movetypes';

export default class MoveEngine {
    move: Move | null;
    updateMove: (newMove: Move | null) => void;
    resetDrag: (newDrag: boolean) => void;
    updateBoard: (changesList: Pair<Coordinates, Pieces>[]) => void;

    constructor(
        move: Move | null,
        setMove: (newMove: Move | null) => void,
        resetDrag: (newDrag: boolean) => void,
        updateBoard: (changesList: Pair<Coordinates, Pieces>[]) => void
    ) {
        this.move = move;
        this.updateMove = setMove;
        this.resetDrag = resetDrag;
        this.updateBoard = updateBoard;
    }

    onStart(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) {
        this.move = new Move(
            new Coordinates(dragged, CoordType.pairCoordinates),
            null
        );
        this.updateMove(this.move);
        this.resetDrag(false);
    }

    whenDragged(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) {
        function resolveHalfSquare(num: number) {
            if (num < 0) return num - 0.5;
            else return num + 0.5;
        }
        let offset = new Pair(
            Math.trunc(
                resolveHalfSquare(
                    info.offset.x / ((window.outerWidth / 100) * 5)
                )
            ),
            Math.trunc(
                resolveHalfSquare(
                    info.offset.y / ((window.outerWidth / 100) * 5)
                )
            )
        );
        dragged.first += offset.second;
        dragged.second += offset.first;
        if (!this.move?.endPosition.comparingWith(dragged)) {
            this.move?.updateMove(
                new Coordinates(dragged, CoordType.pairCoordinates)
            );
            this.updateMove(this.move);
        }

        return dragged;
    }

    checkMoveType(move: Move, board: Pieces[][]) {
        if (
            board[move.endPosition.coords!.first][
                move.endPosition.coords!.second
            ].colour != Colour.none
        )
            return MoveTypes.CaptureMove;
        if (
            board[move.startPosition.coords!.first][
                move.startPosition.coords!.second
            ].shortName === PieceShortNames.King &&
            Math.abs(
                move.startPosition.coords!.second -
                    move.endPosition.coords!.second
            ) > 1
        )
            return MoveTypes.CastleMove;
        if (
            board[move.startPosition.coords!.first][
                move.startPosition.coords!.second
            ].shortName === PieceShortNames.Pawn &&
            ((board[move.startPosition.coords!.first][
                move.startPosition.coords!.second
            ].colour === Colour.white &&
                move.endPosition.coords!.first === 0) ||
                (board[move.startPosition.coords!.first][
                    move.startPosition.coords!.second
                ].colour === Colour.black &&
                    move.endPosition.coords!.first === 7))
        )
            return MoveTypes.PromotionMove;
        return MoveTypes.CaptureMove;
    }

    onEnd(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
        engine: ChessEngine
    ) {
        this.whenDragged(dragged, event, info);

        let board = engine.getBoardData(),
            coords = new Pair(this.move!.startPosition, this.move!.endPosition);

        // updating the moves
        this.move!.endPieceColour =
            board[this.move!.endPosition.coords!.first][
                this.move!.endPosition.coords!.second
            ].colour;
        this.move!.currentFenDetails = engine.fenManager.data;
        this.move!.moveType = this.checkMoveType(this.move!, board);

        if (
            board[coords.first.coords!.first][
                coords.first.coords!.second
            ].canBeMovedTo(this.move!, board)
        ) {
            let changesList: Pair<Coordinates, Pieces>[] = [];
            board[coords.second.coords!.first][coords.second.coords!.second] =
                board[coords.first.coords!.first][coords.first.coords!.second];
            changesList.push(
                new Pair(
                    coords.second,
                    board[coords.second.coords!.first][
                        coords.second.coords!.second
                    ]
                )
            );
            board[coords.first.coords!.first][coords.first.coords!.second] =
                new Piece(Colour.none);
            changesList.push(
                new Pair(
                    coords.first,
                    board[coords.first.coords!.first][
                        coords.first.coords!.second
                    ]
                )
            );
            this.updateBoard(changesList);

            // update FEN Details
            let oldFenDetails = engine.fenManager.data;
            engine.fenManager.regenerateFen(
                new FENDetails(
                    board,
                    board[coords.second.coords!.first][
                        coords.second.coords!.second
                    ].colour === Colour.white
                        ? Colour.black
                        : Colour.white,
                    oldFenDetails.castlingRights,
                    null,
                    board[coords.second.coords!.first][
                        coords.second.coords!.second
                    ].colour === Colour.black
                        ? oldFenDetails.fullMoveClock + 1
                        : oldFenDetails.fullMoveClock,
                    board[coords.second.coords!.first][
                        coords.second.coords!.second
                    ].shortName === 'p' ||
                    this.move!.moveType === MoveTypes.CaptureMove
                        ? 0
                        : oldFenDetails.halfMoveClock + 1
                )
            );
        }
        this.resetDrag(true);
        this.move = null;
        this.updateMove(this.move);
    }
}
