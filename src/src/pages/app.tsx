import { ThemeProvider } from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import NavBar from '../components/navbar/navbar';
import { themeOptions } from '../components/theme/theme';
import Home from './home/home';

function App() {
    return (
        <>
            <BrowserRouter>
                <ParallaxProvider>
                    <ThemeProvider theme={themeOptions}>
                        <NavBar/>
                        <div id="app">
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </div>
                    </ThemeProvider>
                </ParallaxProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
