import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Home() {
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
                    animate={{ rotate: [0, 360] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        repeatDelay: 1,
                        duration: 1,
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
