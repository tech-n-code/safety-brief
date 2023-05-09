import { useState } from 'react'
import './App.css'
import Dashboard from './Dashboard';

function App() {

    return (
        <>
            <Dashboard/>
        </>
    )
}

function Navigation() {

    return (
        <div className="navbar flex bg-base-100 rounded-box">
            <div className="justify-end px-2">
                <a className="text-lg font-bold">Safety Brief!</a>
            </div> 
            <div className="flex justify-end flex-1 px-2">
            </div>
        </div>
    );
}

function DropDown() {
    return (
        <div className="dropdown dropdown-end">
            
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
            <Avatar />
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


export default App
