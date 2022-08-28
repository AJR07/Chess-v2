import { Stack, useTheme } from '@mui/material';
import { useRef, useState } from 'react';
import Move from '../board/move/move';
import ChessBackgroundClass from './chessbackground';
import ChessPiecesClass from './chesspieces';
import ChessPromotionClass from './chesspromotion';

function ChessBoard(
    PiecesComponent: any,
    BackgroundComponent: any,
    PromotionComponent: any
) {
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
                    marginLeft: '25vw',
                }}
            >
                <BackgroundComponent theme={theme} move={moveState} />
                <PiecesComponent reference={ref} move={moveState} />
                <PromotionComponent move={moveState} />
            </Stack>
        );
    };
}

export default ChessBoard(
    ChessPiecesClass,
    ChessBackgroundClass,
    ChessPromotionClass
);
