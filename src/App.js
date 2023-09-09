import React from 'react';
import {BrowserRouter as Router, Routes, Route as RoutedRoute} from 'react-router-dom';

import ComponentHeader from "./components/ComponentHeader/ComponentHeader";
import Single from "./templates/Single";
import HomePage from "./templates/HomePage"

function App() {
    return (
        <Router>
            <ComponentHeader/>
            <Routes>
                {/* Homepage */}
                <RoutedRoute path="/" element={<HomePage/>}/>
                {/* Single page (detail page) */}
                <RoutedRoute path="/:slug" element={<Single/>}/>

            </Routes>
        </Router>
    );
}

export default App;