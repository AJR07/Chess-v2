import { Stack, useTheme } from '@mui/material';
import { useRef, useState } from 'react';
import Move from '../board/move/move';
import ChessBackgroundClass from './chessbackground';
import ChessPiecesClass from './chesspieces';

function Board(PiecesComponent: any, BackgroundComponent: any) {
    return function WrappedComponent() {
        const ref = useRef(null);
        const theme = useTheme();
        const moveState: [
            null | Move,
            React.Dispatch<React.SetStateAction<null | Move>>
        ] = useState<null | Move>(null);
        return (
            <Stack
                direction="column"
                sx={{
                    opacity: '0.9',
                    width: '40vw',
                    height: '40vw',
                }}
            >
                <BackgroundComponent theme={theme} move={moveState} />
                <PiecesComponent reference={ref} move={moveState} />
            </Stack>
        );
    };
}

export default Board(ChessPiecesClass, ChessBackgroundClass);
