import { useState, useEffect } from "react";
import Cue from './Cue';

function BriefCard(props) {
    console.log(props.id)
    const [cuesData, setCuesData] = useState([]);
  
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:3000/api/safety-brief/dont?briefID=" + props.id);
            const data = await response.json();
            setCuesData(data);
            console.log(cuesData);
        }
        fetchData();
    }, [props.id]);

    return (
        <div className="card bg-base-100 shadow-xl overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="card-title">{props.title}</h2>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    {cuesData.map((cueData) => (
                        <Cue
                            key={cueData.id}
                            id={cueData.id}
                            cat={cueData.cat}
                            descr={cueData.descr}
                            checked={cueData.checked}
                            usr_id={cueData.usr_id}
                            brief_id={props.id}
                        />
                    ))}
                </dl>
            </div>
        </div>
    );

}

export default BriefCard;