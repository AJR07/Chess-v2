import { Stack } from '@mui/material';
import { Component } from 'react';
import CoordType from '../board/coordinates/coordtype';
import ChessEngine from '../engine';
import Square from '../board/square';
import { motion, PanInfo } from 'framer-motion';
import Pair from '../../utils/pair';
import Move from '../board/move/move';
import MoveEngine from '../board/move/moveengine';
import { Pieces } from '../board/piece/piecetype';
import Coordinates from '../board/coordinates/coordinates';

interface ChessPiecesProps {
    move: [null | Move, React.Dispatch<React.SetStateAction<null | Move>>];
    reference: React.MutableRefObject<null>;
}

interface ChessPiecesState {
    resetDrag: boolean;
    board: Pieces[][];
}

export default class ChessPiecesClass extends Component<
    ChessPiecesProps,
    ChessPiecesState
> {
    engine: ChessEngine;
    moveEngine: MoveEngine;

    constructor(props: ChessPiecesProps) {
        super(props);
        this.engine = new ChessEngine();

        // move state
        this.updateMove = this.updateMove.bind(this);
        // reset drag state
        this.resetDrag = this.resetDrag.bind(this);
        // board state
        this.updateBoard = this.updateBoard.bind(this);
        this.state = {
            resetDrag: false,
            board: this.engine.getBoardData(),
        };

        this.moveEngine = new MoveEngine(
            this.props.move[0],
            this.updateMove,
            this.resetDrag,
            this.updateBoard
        );
    }

    updateBoard(changesList: Pair<Coordinates, Pieces>[]) {
        let board: Pieces[][] = [...this.state.board];

        for (let change of changesList) {
            board[change.first.coords!.first][change.first.coords!.second] =
                change.second;
        }
        this.setState({ board: board });
    }

    resetDrag(newDrag: boolean) {
        this.setState({ resetDrag: newDrag });
    }

    updateMove(newMove: Move | null) {
        this.props.move[1](newMove);
    }

    render() {
        let boardDisplay: JSX.Element[] = [];

        for (let i = 0; i < 8; i++) {
            let row: JSX.Element[] = [];
            for (let j = 0; j < 8; j++) {
                row.push(
                    <motion.div
                        key={`${this.state.board[i][j].name}${this.state.board[i][j].colour}${i}${j}`}
                        drag={true}
                        dragElastic={0}
                        onDragStart={(
                            event: MouseEvent | TouchEvent | PointerEvent,
                            info: PanInfo
                        ) =>
                            this.moveEngine.onStart(new Pair(i, j), event, info)
                        }
                        onDrag={(
                            event: MouseEvent | TouchEvent | PointerEvent,
                            info: PanInfo
                        ) =>
                            this.moveEngine.whenDragged(
                                new Pair(i, j),
                                event,
                                info
                            )
                        }
                        onDragEnd={(
                            event: MouseEvent | TouchEvent | PointerEvent,
                            info: PanInfo
                        ) =>
                            this.moveEngine.onEnd(
                                new Pair(i, j),
                                event,
                                info,
                                this.engine
                            )
                        }
                        dragConstraints={this.props.reference}
                        dragMomentum={false}
                        animate={this.state.resetDrag ? { x: 0, y: 0 } : {}}
                    >
                        <Square
                            coordinates={`${i}${j}`}
                            coordtype={CoordType.numericCoordinates}
                            piece={this.state.board[i][j]}
                        ></Square>
                    </motion.div>
                );
            }
            boardDisplay.push(
                <Stack direction="row" key={i}>
                    {row}
                </Stack>
            );
        }

        return (
            <motion.div
                className="horizontal-center"
                ref={this.props.reference}
                style={{ position: 'absolute' }}
                id="pieces-screen"
            >
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                >
                    {boardDisplay}
                </Stack>
            </motion.div>
        );
    }
}
