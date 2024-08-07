import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewTask from './components/NewTask';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/nueva-tarea" element={<NewTask />} />
                <Route path="/edit/:id" element={<NewTask />} />
            </Routes>
        </Router>
    );
};

export default App;
