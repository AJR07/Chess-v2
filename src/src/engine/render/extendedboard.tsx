import { Stack } from '@mui/material';
import Board from './board';
import SidePanel from './sidepanel/sidepanel';

/**
 * Extend the Base UI of the chessboard with additional functionality
 * eg. the side panel
 *
 * @export
 * @returns {*}
 */
export default function ExtendedChessBoard() {
    return (
        <Stack direction="row" spacing={5}>
            <div id="board" style={{ marginLeft: '15vw' }}>
                <Board />
            </div>
            <SidePanel />
        </Stack>
    );
}
