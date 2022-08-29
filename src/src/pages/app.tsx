import {
    createTheme,
    Grid,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import NavBar from '../components/navbar/navbar';
import { themeOptions } from '../components/theme';
import Home from './home/home';
import '../css/master.css';
import PassAndPlay from './passandplay/passandplay';
import { useState } from 'react';
import ThemeSelector from './theme/theme';

export default function App() {
    let [themeIdx, setThemeName] = useState('blue');
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
                    <Route path="/" element={<Home />} />
                </Routes>
            </Grid>
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
