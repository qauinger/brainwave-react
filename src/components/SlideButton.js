import React from 'react';
import { Link } from 'react-router-dom';

function SlideButtonR(props) {
    return(
        <h2><Link to={props.to} className="slide-r-hover"><span className="bwgradient-hover">{props.title}</span></Link></h2>
    )
}

function SlideButtonL(props) {
    return(
        <h2><a href={props.to} className="slide-l-hover"><span className="bwgradient-hover">{props.title}</span></a></h2>
    )
}

function SlideButtonRUnlinked(props) {
    return(
        <h2 className="slide-r-hover cursor-pointer"><span className="bwgradient-hover">{props.title}</span></h2>
    )
}

export { SlideButtonR, SlideButtonL, SlideButtonRUnlinked };
