import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <div id="header">
            <Link to="/"><img src="https://qauinger.com/brainwave/res/brainwave-icon.svg" alt="Brainwave"/>Brainwave</Link>
        </div>
    );
}

export default Header;
