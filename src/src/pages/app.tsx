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
import { createContext, useEffect, useState } from 'react';
import ThemeSelector from './theme/theme';
import Info from './info/info';
import PageNotFound from './404/404';
import { AlertManager } from '../components/alert/alert';

/**
 * This function is the top of the UI tree where the main app lies in.
 * It also wraps the AppSettings renderer around the main app, which applies many settings that the app needs to have for basic things to function.
 *
 * @date 9/10/2022 - 9:58:50 PM
 *
 * @export
 * @returns {*}
 */
export default function App() {
    let [themeIdx, setThemeName] = useState(
        (!localStorage.getItem('theme')
            ? 'blue'
            : localStorage.getItem('theme')) as string
    );
    useEffect(() => {
        localStorage.setItem('theme', themeIdx);
    }, [themeIdx]);
    return (
        <AppSettings themeIdx={themeIdx}>
            <NavBar />
            <Grid item id='app' sx={{ width: '92.5vw' }}>
                <Routes>
                    <Route path='/pass-and-play' element={<PassAndPlay />} />
                    <Route
                        path='/theme-selector'
                        element={
                            <ThemeSelector
                                themeName={themeIdx}
                                setThemeName={setThemeName}
                            />
                        }
                    />
                    <Route path='/info' element={<Info />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </Grid>
            <Typography
                variant='caption'
                fontWeight={1000}
                fontSize={15}
                sx={{
                    position: 'absolute',
                    color: 'primary.main',
                    marginLeft: '90vw',
                    marginTop: '95vh',
                }}
            >
                Made by: <a href='https://github.com/AJR07/Chess-v2'>AJR07</a>
            </Typography>
        </AppSettings>
    );
}

/**
 * Props that the app settings wrapper takes in.
 *
 * @interface AppSettingsProps
 * @typedef {AppSettingsProps}
 */
interface AppSettingsProps {
    themeIdx: string;
    children: JSX.Element[];
}

/**
 * A wrapper that wraps a lot of key app settings such as:
 * 1. Themes
 * 2. Parallax Provider
 * 3. Alert Managers
 *
 * @param {AppSettingsProps} props
 * @returns {*}
 */
function AppSettings(props: AppSettingsProps) {
    return (
        <>
            <BrowserRouter>
                <ParallaxProvider>
                    <ThemeProvider
                        theme={responsiveFontSizes(
                            createTheme(themeOptions[props.themeIdx])
                        )}
                    >
                        <AlertManager>
                            <Grid
                                container
                                direction='row'
                                sx={{ height: '100vh' }}
                            >
                                {props.children}
                            </Grid>
                        </AlertManager>
                    </ThemeProvider>
                </ParallaxProvider>
            </BrowserRouter>
        </>
    );
}
