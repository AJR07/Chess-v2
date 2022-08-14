import { PanInfo } from 'framer-motion';
import Pair from '../../../utils/pair';
import ChessEngine from '../../engine';
import Coordinates from '../coordinates/coordinates';
import CoordType from '../coordinates/coordtype';
import Colour from '../piece/colour';
import { Pieces } from '../piece/piecetype';
import Piece from '../piece/types/empty';
import Move from './move';
import BaseMove from './types/basemove';

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
        this.move = new BaseMove(
            new Coordinates(dragged, CoordType.pairCoordinates)
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

    onEnd(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
        engine: ChessEngine
    ) {
        this.whenDragged(dragged, event, info);
        // TODO: Processing of whether move is legal
        let board = engine.getBoardData(),
            coords = new Pair(this.move!.startPosition, this.move!.endPosition);
        if (
            board[coords.first.coords!.first][
                coords.first.coords!.second
            ].canBeMovedTo(this.move!)
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
        }
        this.resetDrag(true);
        this.move = null;
        this.updateMove(this.move);
    }
}
