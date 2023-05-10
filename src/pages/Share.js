import React from 'react';
import { Link, useParams } from 'react-router-dom';


function Share() {
    const uuid = useParams().uuid;

    const copyToClipboard = () => {
        navigator.clipboard.writeText('https://qauinger.com/brainwave/activity/' + uuid);
    }

    return(
        <div>
            <h1><span className="bwgradient">Share</span> your activity</h1>
            <p title='Click to Copy' className="fs36 cursor-copy" onClick={copyToClipboard}>https://qauinger.com/brainwave/activity/{uuid}</p>
            <h2><span className="bwgradient-hover cursor-pointer" onClick={copyToClipboard}>Copy link</span> ~ <Link to={"/activity/" + uuid} className="bwgradient-hover" target="_blank">Preview</Link></h2>
        </div>
    );
}

export default Share;
