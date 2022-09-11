import { Stack, useTheme } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { AlertContext } from '../../components/alert/alert';
import Move from '../board/move/move';
import ChessBackgroundClass from './chessbackground';
import ChessPiecesClass from './chesspieces';

/**
 * Contains the basic UI of the board, including the promotion, background and piece renderer ordered and displayed correctly
 *
 * @param {*} PiecesComponent
 * @param {*} BackgroundComponent
 * @returns {() => any}
 */
function Board(PiecesComponent: any, BackgroundComponent: any) {
    return function WrappedComponent() {
        const ref = useRef(null);
        const theme = useTheme();
        const moveState: [
            null | Move,
            React.Dispatch<React.SetStateAction<null | Move>>
        ] = useState<null | Move>(null);
        const addAlert = useContext(AlertContext);
        return (
            <Stack
                direction='column'
                sx={{
                    opacity: '0.9',
                    width: '40vw',
                    height: '40vw',
                }}
            >
                <BackgroundComponent theme={theme} move={moveState} />
                <PiecesComponent
                    reference={ref}
                    move={moveState}
                    addAlert={addAlert}
                />
            </Stack>
        );
    };
}

export default Board(ChessPiecesClass, ChessBackgroundClass);
