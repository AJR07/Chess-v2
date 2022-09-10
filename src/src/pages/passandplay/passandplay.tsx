import { Typography } from '@mui/material';
import ExtendedChessBoard from '../../engine/render/extendedboard';

/**
 * Renders the page that displays the pass-and-play chessboard
 *
 * @export
 * @returns {*}
 */
export default function PassAndPlay() {
    return (
        <div id="pass-and-play">
            <Typography
                variant="h2"
                fontWeight={1000}
                className="horizontal-center"
                sx={{
                    color: 'secondary.light',
                    paddingTop: '5vh',
                    paddingBottom: '5vh',
                }}
            >
                Pass-and-Play
            </Typography>
            <ExtendedChessBoard />
        </div>
    );
}
