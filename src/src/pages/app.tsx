import {
    createTheme,
    Grid,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import NavBar from '../components/navbar';
import { themeOptions } from '../components/theme';
import Home from './home/home';
import '../css/master.css';

export default function App() {
    return AppSettings(
        <>
            <NavBar />
            <Grid item id='app'>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Grid>
        </>
    );
}

function AppSettings(content: JSX.Element) {
    return (
        <>
            <BrowserRouter>
                <ParallaxProvider>
                    <ThemeProvider
                        theme={responsiveFontSizes(createTheme(themeOptions))}
                    >
                        <Grid container direction="row" spacing="2.5vw" sx={{height:'100vw'}}>
                            {content}
                        </Grid>
                    </ThemeProvider>
                </ParallaxProvider>
            </BrowserRouter>
        </>
    );
}
