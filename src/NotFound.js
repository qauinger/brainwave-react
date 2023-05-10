import { SlideButtonL } from './components/SlideButton'

function NotFound() {
    return(
        <div>
            <h1>Uh oh.</h1>
            <div className='indent'>
                <h2>It looks like you might be lost :/</h2>
                <SlideButtonL to="/" title="Return to safety"/>
            </div>
        </div>
    );
}

export default NotFound;
