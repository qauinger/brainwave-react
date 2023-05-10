import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import NotFound from './NotFound';
import Create from './pages/Create';
import Share from './pages/Share';
import Activity from './pages/Activity';
import { SlideButtonR } from './components/SlideButton';

function Brainwave() {
    return (
        <Router>
            <div id="wrapper" style={{width: '80%', margin: '0 auto'}}>
                <Header/>
                <Routes>
                    <Route path='' Component={Home}/>
                    <Route path='about' Component={About}/>
                    <Route path='create/*' Component={Create}/>
                    <Route path='share/:uuid' Component={Share}/>
                    <Route path='activity/:uuid' Component={Activity}/>
                    <Route path='*' Component={NotFound}/>
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return(
        <div>
            <h1>Welcome to <span className="bwgradient">brainwave</span>!</h1>
            <div className='indent'>
                <p className="fs36">Targeted individualized activities designed by <span className="bwgradient">you</span>.</p>
                <h2>What is Brainwave?</h2>
                <p>Brainwave allows educators to easily create learning activities for their students, and provides a comprehesible environment for students to learn.</p>
                <SlideButtonR to="about" title="Learn more about Brainwave"/>
                <SlideButtonR to="create" title="Start creating"/>
            </div>
        </div>
    );
}

export default Brainwave;
