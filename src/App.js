import React from 'react';
import {BrowserRouter as Router, Routes, Route as RoutedRoute} from 'react-router-dom';

import SinglePage from './templates/SinglePage';
import ComponentHeader from "./components/ComponentHeader/ComponentHeader";
import ArchivePage from "./templates/ArchivePage";
import HomePage from "./templates/HomePage"

function App() {
    return (
        <Router>
            <ComponentHeader/>
            <Routes>
                {/* Homepage */}
                <RoutedRoute path="/" element={<HomePage/>}/>
                {/* Single page (detail page) */}
                <RoutedRoute path="/:slug" element={<SinglePage/>}/>
                {/* Archive page */}
                <RoutedRoute path="/pages" element={<ArchivePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;