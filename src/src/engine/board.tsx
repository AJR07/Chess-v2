import { Stack, Theme, useTheme } from '@mui/material';
import { Component, useRef, useState } from 'react';
import CoordType from './board/coordinates/coordtype';
import ChessEngine from './engine';
import Square from './board/square';
import { motion, PanInfo } from 'framer-motion';
import Pair from '../utils/pair';
import { Box } from '@mui/system';
import Move from './board/move/move';
import MoveEngine from './board/move/moveengine';
import { Pieces } from './board/piece/piecetype';
import Coordinates from './board/coordinates/coordinates';

interface ChessBoardProps {
    reference: React.MutableRefObject<null>;
    theme: Theme;
}

interface ChessBoardState {
    move: Move | null;
    resetDrag: boolean;
    board: Pieces[][];
}

function ChessBoard(Component: any) {
    return function WrappedComponent() {
        const ref = useRef(null);
        const theme = useTheme();
        return <Component reference={ref} theme={theme} />;
    };
}

class ChessBoardClass extends Component<ChessBoardProps, ChessBoardState> {
    engine: ChessEngine;
    moveEngine: MoveEngine;

    constructor(props: ChessBoardProps) {
        super(props);
        this.engine = new ChessEngine();

        // move state
        this.updateMove = this.updateMove.bind(this);
        // reset drag state
        this.resetDrag = this.resetDrag.bind(this);
        // board state
        this.updateBoard = this.updateBoard.bind(this);
        this.state = {
            move: null,
            resetDrag: false,
            board: this.engine.getBoardData(),
        };

        this.moveEngine = new MoveEngine(
            this.state.move,
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
        this.setState({ move: newMove });
    }

    render() {
        let boardDisplay: JSX.Element[] = [],
            background: JSX.Element[] = [];

        for (let i = 0; i < 8; i++) {
            let row: JSX.Element[] = [],
                rowBackground: JSX.Element[] = [];
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
                let startComparison =
                        this.state.move?.startPosition.comparingWith(
                            new Pair(i, j)
                        ),
                    endComparison = this.state.move?.endPosition.comparingWith(
                        new Pair(i, j)
                    );
                rowBackground.push(
                    <Box
                        sx={{
                            backgroundColor: startComparison
                                ? this.props.theme.palette.secondary.light
                                : endComparison
                                ? this.props.theme.palette.error.light
                                : `primary.${
                                      (i + j) % 2 == 0 ? 'light' : 'dark'
                                  }`,
                            width: '5vw',
                            height: '5vw',
                        }}
                        key={j}
                    ></Box>
                );
            }
            boardDisplay.push(
                <Stack direction="row" key={i}>
                    {row}
                </Stack>
            );
            background.push(
                <Stack direction="row" key={i}>
                    {rowBackground}
                </Stack>
            );
        }

        return (
            <Stack
                alignItems="center"
                justifyContent="center"
                direction="column"
                sx={{
                    opacity: '0.9',
                }}
            >
                <motion.div
                    id="chessboard"
                    className="horizontal-center"
                    ref={this.props.reference}
                >
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        style={{ position: 'absolute' }}
                    >
                        {boardDisplay}
                    </Stack>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                    >
                        {background}
                    </Stack>
                </motion.div>
            </Stack>
        );
    }
}

export default ChessBoard(ChessBoardClass);
