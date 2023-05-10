import { React, useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './css/create.css';
import NotFound from '../NotFound';
import { SlideButtonRUnlinked } from '../components/SlideButton';

import topics from '../curriculum/topics.json';
import activities from '../curriculum/activities.json';

function Create() {
    return(
        <div>
            <h1><span className="bwgradient">Create</span> an activity</h1>
            <Routes>
                <Route path='/' Component={List}/>
                <Route path=':activity' Component={Activity}/>
                <Route path='*' Component={NotFound}/>
            </Routes>
        </div>
    );
}

function List() {
    var activitesByTopic = {};
    Object.keys(activities).forEach((activity) => {
        var topic = activities[activity]['topic'];
        if(!Object.keys(activitesByTopic).includes(topic))
            activitesByTopic[topic] = [];
        activitesByTopic[topic].push(activity);
    });
    const curriculum = Object.keys(topics).map((topic) =>
        <div key={topic} className="activity-topic">
            <h2 className="activity-topic-title" style={{color: topics[topic]['color']}}>{topics[topic]['name']}</h2>
            <div style={{color: topics[topic]['color']}}>
                {activitesByTopic[topic] == null ? null : activitesByTopic[topic].map((activity) =>
                    <h2 key={activity}><Link className="color-hover" style={{"--data-color-hover": topics[topic]['color']}} to={activity}>{activities[activity]['name']}</Link></h2>
                )}
            </div>
        </div>
    );                   
    return (
        <div className='indent'>
            <h4># = Any number</h4>
            <div id='activity-container'>
                {curriculum}
            </div>
        </div>
    );
}

function Activity(props) {
    const navigate = useNavigate();
    const activity = useParams().activity;
    if(!Object.keys(activities).includes(activity)) {
        return(<NotFound/>)
    }

    const formData = {};
    const updateFormData = (id, data) => {
        formData[id] = data;
    }

    const title = {
        "title": {
            "label": "Activity Title",
            "type": "string",
            "default": activities[activity]['name']
        }
    }
    
    const properties = Object.keys(Object.assign({}, title, activities[activity]['properties'])).map((property) =>
        <div key={property} className='property'>
            <Property id={property} updateData={updateFormData} data={activities[activity]['properties'][property] ?? title[property]}/>
        </div>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData, null, null)
        };
        fetch('http://localhost:5502/gen', requestOptions)
        .then(response => {
            var data = response.json();
            data.then((response) => {
                navigate(`/share/${response['uuid']}`);
            })
        });
    }

    return(
        <div className='indent'>
            <h2>{activities[activity]['name']}</h2>
            <form id='form'>
                {properties}
                <span onClick={handleSubmit}>
                    <SlideButtonRUnlinked title='Create activity'/>
                </span>
            </form>
        </div>
    );
}

function Property(props) {
    switch(props.data.type) {
        case 'label':
            return(<LabelProperty id={props.id} updateData={props.updateData} data={props.data} disabled={props.disabled} multikey={props.multikey}/>)
        case 'number':
            return(<NumberProperty id={props.id} updateData={props.updateData} data={props.data} disabled={props.disabled} multikey={props.multikey}/>)
        case 'string':
            return(<StringProperty id={props.id} updateData={props.updateData} data={props.data} disabled={props.disabled} multikey={props.multikey}/>)
        case 'range':
            return(<RangeProperty id={props.id} updateData={props.updateData} data={props.data} disabled={props.disabled} multikey={props.multikey}/>)
        case 'selectMultiple':
            return(<CheckboxProperty id={props.id} updateData={props.updateData} data={props.data} disabled={props.disabled} multikey={props.multikey}/>)
        case 'multi':
            return(<MultiProperty id={props.id} updateData={props.updateData} data={props.data} disabled={props.disabled} multikey={props.multikey}/>)
        default:
            return(<label>Error</label>)
    }
}

function LabelProperty(props) {
    return (
        <div>
            <label htmlFor={props.id} className={props.disabled ? 'disabled-label':''}>{props.data.label}</label>
        </div>
    )
}

function NumberProperty(props) {
    const [value, setValue] = useState(props.data.default);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        props.updateData(props.multikey ?? props.id, Number(value));
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <label htmlFor={props.id} className={props.disabled ? 'disabled-label':''}>{props.data.label}:</label>
            <input
                type='number'
                id={props.id}
                value={value}
                onChange={handleChange}
                min={props.data.min}
                max={props.data.max}
                disabled={props.disabled}
            />
        </div>
    )
}

function StringProperty(props) {
    const [value, setValue] = useState(props.data.default);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        props.updateData(props.multikey ?? props.id, value);
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <label htmlFor={props.id} className={props.disabled ? 'disabled-label':''}>{props.data.label}:</label>
            <input
                type='text'
                id={props.id}
                value={value}
                onChange={handleChange}
                disabled={props.disabled}
            />
        </div>
    )
}

function CheckboxProperty(props) {
    const [selected, setSelected] = useState(new Set(props.data.default));

    const handleChange = (e) => {
        selected.has(e.target.id) ? selected.delete(e.target.id) : selected.add(e.target.id);
        setSelected(new Set(selected));
    }

    useEffect(() => {
        props.updateData(props.multikey ?? props.id, Array.from(selected));
    }, [selected]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <label className={props.disabled ? 'disabled-label':''}>{props.data.label}:</label>
            {Object.keys(props.data.options).map((option) =>
                <div key={option}>
                    <input
                        type='checkbox'
                        id={'' + option}
                        checked={selected.has(option)}
                        onChange={handleChange}
                        disabled={props.disabled}
                        />
                    <label htmlFor={props.id + '-' + option} className={props.disabled ? 'disabled-label':''}>{props.data.options[option]}</label>
                </div>
            )}
        </div>
    )
}

function RangeProperty(props) {
    const [min, setMin] = useState(props.data.defaultmin);
    const [max, setMax] = useState(props.data.defaultmax);

    const handleMinChange = (e) => {
        setMin(e.target.value);
    }

    const handleMaxChange = (e) => {
        setMax(e.target.value);
    }

    useEffect(() => {
        props.updateData(props.multikey ?? props.id, {'min':Number(min), 'max':Number(max)});
    }, [min, max]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <label htmlFor={props.id} className={props.disabled ? 'disabled-label':''}>{props.data.label}: </label>
            <label htmlFor={props.id + '-min'} className={props.disabled ? 'disabled-label':''}>From</label>
            <input
                type='number'
                id={props.id + '-min'}
                value={min}
                onChange={handleMinChange}
                disabled={props.disabled}
            />
            <label htmlFor={props.id + '-max'} className={props.disabled ? 'disabled-label':''}>to</label>
            <input
                type='number'
                id={props.id + '-max'}
                value={max}
                onChange={handleMaxChange}
                disabled={props.disabled}
            />
        </div>
    )
}

function MultiProperty(props) {
    const [selected, setSelected] = useState(props.data.default);
    const [data, setData] = useState(new Map());

    const updateData = (id, d) => {
        var bop = data.set(id, d);
        setData(new Map(bop));
        var toUpdate = new Map();
        toUpdate.set(selected, bop.get(selected));
        props.updateData(props.id, toUpdate);
    }

    const handleChange = (e, option) => {
        setSelected(option);
    }

    useEffect(() => {
        var bop = {};
        bop[selected] = data.get(selected);
        props.updateData(props.id, bop);
    }, [selected, data]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <label>{props.data.label}:</label>
            {Object.keys(props.data.options).map((option) =>
                <div key={option} className="inline">
                    <input
                        type='radio'
                        id={props.id + '-' + option}
                        checked={selected === option ? true : false}
                        onChange={(e) => handleChange(e, option)}
                    />
                    <Property id={props.id + '-' + option} multikey={option} updateData={updateData} data={props.data.options[option]} disabled={selected === option ? false : true}/>
                </div>
            )}
        </div>
    )
}

export default Create;
