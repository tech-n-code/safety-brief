import { useState } from 'react'
import './App.css'
import Dashboard from './Dashboard';

function App() {

    return (
        <>
            <Navigation/>
            <Dashboard/>
        </>
    );
}

function Navigation() {

    return (
        <div className="navbar flex bg-base-300 rounded-box">
            <div className="justify-end px-2">
                <a className="text-3xl font-bold">Safety Brief!</a>
            </div> 
            <div className="flex justify-end flex-1 px-2">
                <DropDown/>
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

function DropDown() {
    return (
        <div className="dropdown dropdown-end">
            <Avatar />
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>New Brief</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>
    );
}

export default App;
