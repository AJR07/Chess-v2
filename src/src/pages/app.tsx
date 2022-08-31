import {
    createTheme,
    Grid,
    responsiveFontSizes,
    ThemeProvider,
    Typography,
} from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import NavBar from '../components/navbar/navbar';
import { themeOptions } from '../components/theme';
import Home from './home/home';
import '../css/master.css';
import PassAndPlay from './passandplay/passandplay';
import { useEffect, useState } from 'react';
import ThemeSelector from './theme/theme';
import Info from './info/info';

export default function App() {
    let [themeIdx, setThemeName] = useState(
        (!localStorage.getItem('theme')
            ? 'blue'
            : localStorage.getItem('theme')) as string
    );
    useEffect(() => {
        localStorage.setItem('theme', themeIdx);
    }, [themeIdx]);
    return AppSettings(
        themeIdx,
        <>
            <NavBar />
            <Grid item id="app" sx={{ width: '92.5vw' }}>
                <Routes>
                    <Route path="/pass-and-play" element={<PassAndPlay />} />
                    <Route
                        path="/theme-selector"
                        element={
                            <ThemeSelector
                                themeName={themeIdx}
                                setThemeName={setThemeName}
                            />
                        }
                    />
                    <Route path="/info" element={<Info />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Grid>
            <Typography
                variant="caption"
                fontWeight={1000}
                fontSize={15}
                sx={{
                    position: 'absolute',
                    color: 'primary.main',
                    marginLeft: '90vw',
                    marginTop: '95vh',
                }}
            >
                Made by: <a href="https://github.com/AJR07/Chess-v2">AJR07</a>
            </Typography>
        </>
    );
}

function AppSettings(themeIdx: string, content: JSX.Element) {
    return (
        <>
            <BrowserRouter>
                <ParallaxProvider>
                    <ThemeProvider
                        theme={responsiveFontSizes(
                            createTheme(themeOptions[themeIdx])
                        )}
                    >
                        <Grid
                            container
                            direction="row"
                            sx={{ height: '100vh' }}
                        >
                            {content}
                        </Grid>
                    </ThemeProvider>
                </ParallaxProvider>
            </BrowserRouter>
        </>
    );
}
