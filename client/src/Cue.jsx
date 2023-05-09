import { useState, useEffect } from "react";
import star from "../src/assets/star.svg";
import starFill from "../src/assets/star-fill.svg";
import deleteBtn from "../src/assets/x-square-fill.svg";

function Cue(props) {
    console.log(props);
    const [isChecked, setIsChecked] = useState(props.checked);
    const [isFavorite, setIsFavorite] = useState(false);
  
    useEffect(() => {
        setIsChecked(props.checked);
    }, []);

    const toggleChecked = () => {
        setIsChecked(!isChecked);
    };
  
    const toggleFavorite = async () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            // add favorite
            const response = await fetch("http://localhost:3000/api/safety-brief/fave", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usr_id: props.usr_id,
                    dont_id: props.id
                })
            });
    
            if (!response.ok) {
                console.log('Failed to add favorite');
            }
        } else {
            // delete favorite <usr_id/dont_id>
            const response = await fetch(`http://localhost:3000/api/safety-brief/fave/${props.usr_id}/${props.id}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) {
                console.log('Failed to delete favorite');
            }
        }
    };
  
    //Delete DONT from BRIEF by <brief_id/dont_id>
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:3000/api/safety-brief/brief_dont/${props.brief_id}/${props.id}`, {
            method: 'DELETE'
        });
    
        if (!response.ok) {
            console.log('Failed to delete cue');
        }
    };

    return (
        <div className="flex items-center">
            <label className="cursor-pointer flex items-center">
                <input
                    type="checkbox"
                    className="checkbox m-2"
                    checked={isChecked}
                    onChange={toggleChecked}
                />
                <span className="m-2">{props.descr}</span>
            </label>
            <div className="flex-grow"></div>
            <img
                src={isFavorite ? starFill : star}
                alt="star"
                className={`w-6 h-6 m-2 cursor-pointer star-icon
                    ${isFavorite ? 'star-icon--filled' : ''}`}
                onClick={toggleFavorite}
            />
            <img
                src={deleteBtn}
                alt="delete"
                className="w-6 h-6 m-2 cursor-pointer"
                onClick={handleDelete}
            />
        </div>
    );
}

export default Cue;