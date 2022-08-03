import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ChessBoard from '../../engine/board';

export default function Home() {
    let _ = new ChessBoard();
    return (
        <Stack id="home" style={{ padding: '1vw' }} direction="column">
            <Typography
                variant="h6"
                fontWeight={510}
                sx={{ color: 'primary.light' }}
            >
                Welcome to...
            </Typography>
            <Stack id="logo" direction="row">
                <motion.img
                    src="/images/chess_set/version2/white_pawn.png"
                    style={{ width: 'auto', height: 90 }}
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        repeatDelay: 0.5,
                    }}
                />
                <Typography
                    variant="h1"
                    fontWeight={510}
                    sx={{ color: 'secondary.light' }}
                >
                    AJR's Chess Arena
                </Typography>
            </Stack>
        </Stack>
    );
}
