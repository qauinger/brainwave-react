import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Activity() {
    const uuid = useParams().uuid;

    return(
        <div>
            <h1>Activity {uuid}</h1>
        </div>
    );
}

export default Activity;
