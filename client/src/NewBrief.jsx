import { useState, useEffect } from 'react';

function NewBrief(props) {
    const [briefTitle, setBriefTitle] = useState('');
    const [categoryAmounts, setCategoryAmounts] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/safety-brief/cue/cat")
            .then(response => response.json())
            .then(data => {
            console.log(data); // categories data
            setCategories(data);
            })
            .catch(error => {
            console.error(error);
            });
    }, []);

    const handleInputChange = (e, category) => {
        setCategoryAmounts({ ...categoryAmounts, [category]: parseInt(e.target.value) });
    };

    const handleCreateBrief = async () => {
        try {
            // Create the brief
            const data = { title: briefTitle, usr_id: props.authUserID };
            const response = await fetch('http://localhost:3000/api/safety-brief/brief', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                console.log('Failed to create BRIEF');
            }
            const brief = await response.json();
            const briefId = brief[0].id;
    
            // Add cues to the brief for each category
            if (briefId !== null) {
                for (const category of categories) {
                    const numCues = categoryAmounts[category.cat];
                    if (numCues > 0) {
                        const cueResponse = await fetch('http://localhost:3000/api/safety-brief/brief_cue', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ brief_id: briefId, cat: category.cat, num_cues: numCues })
                        });
                        if (!cueResponse.ok) {
                            console.log(`Failed to add cues for category ${category.cat}`);
                            continue;
                        }
                    }
                }
            }
                
            console.log('Brief and cues created successfully!');
            // props.addBrief(brief[0]); // Add new brief to the briefs state
            // props.hideForm(); // Hide the NewBrief component
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-6 pt-20">

            <label className="text-xl font-bold" htmlFor="brief-title">Brief Title:</label>
            <input className="input input-primary w-full max-w-xs mx-3" type="text" placeholder="Type here" id="brief-title" value={briefTitle} onChange={e => setBriefTitle(e.target.value)} />

            {categories.map((category, index) => (
                <div key={index}>
                    <label htmlFor={`category-${category.id}`}>{`${category.cat} (${category.qty})`}:</label>
                    <input type="number" id={`category-${category.id}`} value={categoryAmounts[category.cat] || 0} onChange={e => handleInputChange(e, category.cat)} />
                </div>
            ))}

        <button onClick={handleCreateBrief}>Create Brief</button>
        </div>
    );
}

export default NewBrief;