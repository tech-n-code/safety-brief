import { useState, useEffect } from "react";
import Cue from './Cue';

function BriefCard(props) {
    // console.log(props)
    const [cuesData, setCuesData] = useState([]);
    const [favoriteCues, setFavoriteCues] = useState([]);
    // console.log("cuesData")
    // console.log(cuesData)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:3000/api/safety-brief/cue?briefID=" + props.id);
            const data = await response.json();
            setCuesData(data);
        }
        fetchData();
    }, [props.id]);

    useEffect(() => {
        async function fetchFavorites() {
            const response = await fetch("http://localhost:3000/api/safety-brief/fave?usrID=" + props.usr_id);
            const data = await response.json();
            setFavoriteCues(data);
        }
        fetchFavorites();
    }, [props.usr_id]);

    const removeCue = (cueId) => {
        setCuesData(cuesData.filter(cueData => cueData.id !== cueId));
    }

    return (
        <div className="card bg-base-100 shadow-xl overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="card-title">{props.title}</h2>
            </div>
            <div className="border-t border-gray-500">
                <dl>
                    {cuesData.map((cueData) => (
                        <Cue
                            key={cueData.id}
                            id={cueData.id}
                            cat={cueData.cat}
                            descr={cueData.descr}
                            checked={cueData.checked}
                            usr_id={props.usr_id}
                            brief_id={props.id}
                            isFavorite={favoriteCues.some(fav => fav.cue_id === cueData.id)}
                            removeCue={removeCue}
                        />
                    ))}
                </dl>
            </div>
        </div>
    );
}

export default BriefCard;