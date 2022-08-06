import { Typography } from '@mui/material';

export default function SinglePlayer() {
    return (
        <div id="singleplayer">
            <Typography
                variant="h2"
                fontWeight={1000}
                className="horizontal-center"
                sx={{ color: 'secondary.light' }}
            >
                SinglePlayer Chessboard
            </Typography>
        </div>
    );
}
