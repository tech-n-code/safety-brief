import { useState } from 'react'
import './App.css'
import Dashboard from './Dashboard';
import NewBrief from './NewBrief'

function App() {
    const [showNewBriefForm, setShowNewBriefForm] = useState(false);
    
    const handleNewBriefClick = () => {
        setShowNewBriefForm(true);
    };

    return (
        <>
            <Navigation handleNewBriefClick={handleNewBriefClick} />
            {showNewBriefForm && <NewBrief />}
            <Dashboard />
        </>
    );
}

function Navigation(props) {

    return (
        <div className="navbar flex bg-base-300 fixed top-0 w-full z-50">
            <div className="justify-end px-2">
                <a className="text-3xl font-bold">Safety Brief!</a>
            </div> 
            <div className="flex justify-end flex-1 px-2">
                <DropDown handleNewBriefClick={props.handleNewBriefClick} />
            </div>
        </div>
    );
}

function Avatar() {
    return (
        <div className="btn btn-circle btn-primary avatar">
            <div tabIndex={0} className="w-24 rounded-full">
                <img src="https://xsgames.co/randomusers/assets/avatars/male/78.jpg" />
            </div>
        </div>
    );
}

function DropDown(props) {

    return (
        <div className="dropdown dropdown-end">
            <Avatar />
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={props.handleNewBriefClick}><a>New Brief</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>
    );
}

export default App;
