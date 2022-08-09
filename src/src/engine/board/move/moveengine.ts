import { PanInfo } from 'framer-motion';
import Pair from '../../../utils/pair';
import Coordinates from '../coordinates/coordinates';
import CoordType from '../coordinates/coordtype';
import Move from './move';
import BaseMove from './types/basemove';

export default class MoveEngine {
    move: Move | null;
    updateMove: React.Dispatch<React.SetStateAction<Move | null>>;

    constructor(
        move: Move | null,
        setMove: React.Dispatch<React.SetStateAction<Move | null>>
    ) {
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
            Math.round(info.offset.x / ((window.outerHeight / 100) * 5)),
            Math.round(info.offset.y / ((window.outerHeight / 100) * 5))
        );
        dragged.first += offset.second;
        dragged.second += offset.first;
        this.move?.updateMove(
            new Coordinates(dragged, CoordType.pairCoordinates)
        );
        this.updateMove(this.move);
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
