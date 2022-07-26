import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import Home from './home/home';

function App() {
    return (
        <>
            <BrowserRouter>
                <ParallaxProvider>
                    <div id="app">
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </div>
                </ParallaxProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
