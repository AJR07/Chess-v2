import { Stack } from '@mui/material';
import { Component } from 'react';
import CoordType from './coordinates/coordtype';
import ChessEngine from './engine';
import Square from './square/square';

interface ChessBoardProps {}

export default class ChessBoard extends Component {
    engine: ChessEngine;

    constructor(props: ChessBoardProps) {
        super(props);
        this.engine = new ChessEngine();
    }

    render() {
        let boardData = this.engine.getBoardData(),
            boardDisplay: JSX.Element[] = [];
        for (let i = 0; i < 8; i++) {
            let row: JSX.Element[] = [];
            for (let j = 0; j < 8; j++) {
                row.push(
                    <Square
                        coordinates={`${i}${j}`}
                        coordtype={CoordType.numericCoordinates}
                        piece={boardData[i][j]}
                    ></Square>
                );
            }
            boardDisplay.push(<Stack direction="row">{row}</Stack>);
        }
        return (
            <div id="chessboard" className="horizontal-center">
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                >
                    {boardDisplay}
                </Stack>
            </div>
        );
    }
}
