import { PanInfo } from 'framer-motion';
import Pair from '../../../utils/pair';
import Coordinates from '../coordinates/coordinates';
import CoordType from '../coordinates/coordtype';
import Move from './move';
import BaseMove from './types/basemove';

export default class MoveEngine {
    move: Move | null;
    updateMove: (newMove: Move | null) => void;

    constructor(move: Move | null, setMove: (newMove: Move | null) => void) {
        this.move = move;
        this.updateMove = setMove;
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
    }

    whenDragged(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) {
        let offset = new Pair(
            Math.trunc(info.offset.x / ((window.outerWidth / 100) * 5) + 0.5),
            Math.trunc(info.offset.y / ((window.outerWidth / 100) * 5) + 0.5)
        );
        dragged.first += offset.second;
        dragged.second += offset.first;
        if (!this.move?.endPosition.comparingWith(dragged)) {
            this.move?.updateMove(
                new Coordinates(dragged, CoordType.pairCoordinates)
            );
            this.updateMove(this.move);
        }
    }

    onEnd(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) {
        this.whenDragged(dragged, event, info);
        // TODO: Processing of whether move is legal
        let legal = true;

        this.move = null;
        this.updateMove(this.move);
        return legal;
    }
}
