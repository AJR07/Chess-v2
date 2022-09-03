import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import CustomisedCard from '../../components/card';

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
            <Stack id="card-section" direction="row" spacing={3}>
                <CustomisedCard
                    name="Pass-And-Play"
                    imageName="chessboard"
                    imageLink="/images/card_images/chessboard.png"
                    description="Play chess with another human in real life, or just setup a board on your own and experiment! :D"
                    webpageLink="chess-ajr07.web.app/pass-and-play"
                    shortenedWebpageLink="/pass-and-play"
                />
                <CustomisedCard
                    name="Theme Picker"
                    imageName="theme-picker"
                    imageLink="/images/card_images/theme_selector.jpg"
                    description="Choose the theme that best suits you for the site."
                    webpageLink="chess-ajr07.web.app/theme-selector"
                    shortenedWebpageLink="/theme-selector"
                />
                <CustomisedCard
                    name="About"
                    imageName="about"
                    imageLink="/images/card_images/AJR07.png"
                    description="Find out more about this site!"
                    webpageLink="chess-ajr07.web.app/info"
                    shortenedWebpageLink="/info"
                />
            </Stack>
        </Stack>
    );
}
