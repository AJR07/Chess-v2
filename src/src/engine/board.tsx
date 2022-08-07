import { Stack } from '@mui/material';
import { Component, useRef } from 'react';
import CoordType from './coordinates/coordtype';
import ChessEngine from './engine';
import Square from './square/square';
import { motion, PanInfo } from 'framer-motion';
import Pair from '../utils/pair';

interface ChessBoardProps {
    reference: React.MutableRefObject<null>;
}

function ChessBoard(Component: any) {
    return function WrappedComponent() {
        const ref = useRef(null);
        return <Component reference={ref} />;
    };
}

class ChessBoardClass extends Component<ChessBoardProps, {}> {
    engine: ChessEngine;

    constructor(props: ChessBoardProps) {
        super(props);
        this.engine = new ChessEngine();
    }

    onDragEnd(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) {
        console.log(dragged.toString(), info.point.x, info.point.y);
    }

    render() {
        let boardData = this.engine.getBoardData(),
            boardDisplay: JSX.Element[] = [];

        for (let i = 0; i < 8; i++) {
            let row: JSX.Element[] = [];
            for (let j = 0; j < 8; j++) {
                row.push(
                    <motion.div
                        key={j}
                        drag={true}
                        dragElastic={0}
                        onDragEnd={(
                            event: MouseEvent | TouchEvent | PointerEvent,
                            info: PanInfo
                        ) => {
                            this.onDragEnd(new Pair(i, j), event, info);
                        }}
                        dragConstraints={this.props.reference}
                        dragMomentum={false}
                    >
                        <Square
                            coordinates={`${i}${j}`}
                            coordtype={CoordType.numericCoordinates}
                            piece={boardData[i][j]}
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
            <motion.div id="chessboard" ref={this.props.reference}>
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

export default ChessBoard(ChessBoardClass);
