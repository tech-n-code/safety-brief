import { useState, useEffect } from "react";
import BriefCard from "./BriefCard";

function Dashboard(props) {
    const [briefsData, setBriefsData] = useState([]);
    const placeholder = 2; //props.usrID
    console.log(briefsData)

    useEffect(() => {
        const fetchBriefs = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/safety-brief/brief?usrID=" + placeholder);
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
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Safety Briefs</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {briefsData.length > 0 && briefsData.map((briefData) => (
                    <BriefCard
                        key={briefData.id}
                        id={briefData.id}
                        title={briefData.title}
                        usr_id={placeholder} //fix later
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
