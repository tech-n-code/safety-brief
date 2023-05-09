import { useState, useEffect } from "react";
import BriefCard from "./BriefCard";

function Dashboard(props) {
    const [briefsData, setBriefsData] = useState([]);
    console.log(briefsData)

    useEffect(() => {
        const fetchBriefs = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/safety-brief/brief?usrID=" + props.authUserID);
                if (response.ok) {
                    const data = await response.json();
                    setBriefsData(data);
                } else {
                    throw new Error('Request failed');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchBriefs();
    }, []);
    
    return (
        <div className="container mx-auto pt-16">
            <h1 className="text-xl font-bold text-info mx-6 my-3">Collection</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-6">
                {briefsData.length > 0 && briefsData.map((briefData) => (
                    <BriefCard
                        key={briefData.id}
                        id={briefData.id}
                        title={briefData.title}
                        usr_id={props.authUserID}
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
